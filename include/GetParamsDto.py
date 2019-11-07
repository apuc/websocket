class GetParamsDto:

    def __init__(self, params):
        self.set_params(params)

    def set_params(self, params):
        if 'user_id' in params:
            self.user_id = params['user_id'][0]
        else:
            self.user_id = None

        if 'chat_id' in params:
            self.chat_id = params['chat_id'][0]
        else:
            self.chat_id = None

        if 'chat_type' in params:
            self.chat_type = params['chat_type'][0]
        else:
            self.chat_type = None

        if 'connection_type' in params:
            self.connection_type = params['connection_type'][0]
        else:
            self.connection_type = 'user'

        if 'interlocutor_id' in params:
            self.interlocutor_id = params['interlocutor_id'][0]
        else:
            self.interlocutor_id = None