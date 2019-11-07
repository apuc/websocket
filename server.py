from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
import urllib.parse as url_parse
from include.GetParamsDto import GetParamsDto
from include.MainHandler import MainHandler

clients = []


class SimpleChat(WebSocket):

    def handleMessage(self):
        h = MainHandler(clients)
        h.msgHandler(self)
        # for client in clients:
        #     if client != self:
        #         client.sendMessage(self.data)
        # server.close()

    def handleConnected(self):
        print(self.request.path, 'connected')
        get_params = url_parse.parse_qs(url_parse.urlsplit(self.request.path).query)
        self.get_params = GetParamsDto(get_params)
        h = MainHandler(clients)
        h.sendCustomJson(self, {'type': 'connection'})
        clients.append(self)

    def handleClose(self):
        clients.remove(self)
        print(self.address, 'closed')
        h = MainHandler(clients)
        h.sendStandardJson(self, 'disconnection')


server = SimpleWebSocketServer('', 5577, SimpleChat)
server.serveforever()
