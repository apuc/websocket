import json


class MainHandler:

    def __init__(self, clients):
        self.clients = clients

    def sendStandardJson(self, client, jsonType, filters=None):
        if filters is None:
            clients = self.clients
        else:
            clients = self.getClientsByFilter(filters)
        for user in clients:
            if user != self:
                resp = {
                    "type": jsonType,
                    "user_id": client.get_params.user_id
                }
                user.sendMessage(json.dumps(resp))

    def sendCustomJson(self, client, params, filters=None):
        if filters is None:
            clients = self.clients
        else:
            clients = self.getClientsByFilter(filters)
        for user in clients:
            if user != self:
                resp = {}
                for key in params:
                    resp.update({key: params[key]})
                resp.update({'user_id': client.get_params.user_id})

                user.sendMessage(json.dumps(resp))

    def msgHandler(self, client):
        try:
            request = json.loads(client.data)
            if request['type'] == 'setParam':
                self.setParamHandler(client, request['key'], request['value'])
            else:
                request.update(client.get_params.__dict__)
                self.sendCustomJson(client, request)
        except:
            print('no json')

        # request = json.loads(msg)
        # print(request, type(request))

    def setParamHandler(self, client, key, value):
        client.get_params.__dict__[key] = value
        print(client.get_params.__dict__)

    def getClientsByFilter(self, filters):
        resClients = []

        for client in self.clients:
            if 'user_id' in filters:
                if int(client.get_params.user_id) == filters['user_id']:
                    resClients.append(client)
                    continue

            if 'chat_id' in filters:
                if int(client.get_params.chat_id) == filters['chat_id']:
                    resClients.append(client)
                    continue

            if 'chat_type' in filters:
                if int(client.get_params.chat_type) == filters['chat_type']:
                    resClients.append(client)
                    continue

            if 'connection_type' in filters:
                if int(client.get_params.connection_type) == filters['connection_type']:
                    resClients.append(client)
                    continue

            if 'interlocutor_id' in filters:
                if int(client.get_params.interlocutor_id) == filters['interlocutor_id']:
                    resClients.append(client)
                    continue

        return resClients
