class GetParamsDto:

    def __init__(self, params):
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
