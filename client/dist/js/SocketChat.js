class SocketChat extends BaseObj {

    constructor(params = {}) {
        super();
        if (Object.keys(params).length !== 0) {
            this.init(params)
        }
    }

    init(params = {}){
        this.paramsDefault = {
            host: 'ws://localhost:5577',
            request: '',
            onOpen: function (evt) {

            },
            onClose: function (evt) {

            },
            onMessage: function (evt) {

            },
            onError: function (evt) {

            }
        };
        this.params = this.merge(this.paramsDefault, params);

        let request = this.params.request !== '' ? '?' + this.params.request : '';
        this.ws = new WebSocket(this.params.host + request);
        this.ws.onopen = this.params.onOpen;
        this.ws.onclose = this.params.onClose;
        this.ws.onmessage = this.params.onMessage;
        this.ws.onerror = this.params.onError;
    }

    send(msg) {
        this.ws.send(msg);
    }

    doDisconnect() {
        this.ws.close();
    }

}