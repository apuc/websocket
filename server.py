from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
import urllib.parse as url_parse
from include.GetParamsDto import GetParamsDto

clients = []


class SimpleChat(WebSocket):

    def handleMessage(self):
        for client in clients:
            if client != self:
                client.sendMessage(self.address[0] + u' - ' + self.data)
        server.close()

    def handleConnected(self):
        print(self.request.path, 'connected')
        get_params = url_parse.parse_qs(url_parse.urlsplit(self.request.path).query)
        self.get_params = GetParamsDto(get_params)
        print(self.get_params.__dict__)
        for client in clients:
            client.sendMessage(self.address[0] + u' - connected')
        clients.append(self)

    def handleClose(self):
        clients.remove(self)
        print(self.address, 'closed')
        for client in clients:
            client.sendMessage(self.address[0] + u' - disconnected')


server = SimpleWebSocketServer('', 5577, SimpleChat)
server.serveforever()
