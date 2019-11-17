class App extends BaseObj {

    constructor() {
        super();
        this.chatId = null;
        this.interlocutorId = null;
    }

    importComponent(name, obj) {
        this[name] = obj
    }

    run() {
        if (this.socket) {
            this.socket.ws.onopen = this.onOpen.bind(this);
            this.socket.ws.onclose = this.onClose.bind(this);
            this.socket.ws.onmessage = this.onMessage.bind(this);
            this.socket.ws.onerror = this.onError.bind(this);
        }
        else {
            console.error('No socket class');
        }

        if (this.form) {
            this.form.onSendToServer = this.onEnter.bind(this);
        }
        else {
            console.error('No form class');
        }
    }

    onMessage(evt) {
        console.log('on message app');
    }

    onOpen(evt) {

        if (this.chatId) {
            this.socket.ws.send(JSON.stringify({type: 'setParam', key: 'chat_id', 'value': this.chatId}));
        }
        if (this.interlocutorId) {
            this.socket.ws.send(JSON.stringify({type: 'setParam', key: 'interlocutor_id', 'value': this.interlocutorId}));
        }
        console.log('on open app');
    }

    onClose(evt) {
        console.log('on close app');
    }

    onError(evt) {
        console.log('on error app');
    }

    onEnter(msg) {
        this.socket.ws.send(JSON.stringify({type: 'msg', text: msg.text}));
        console.log(msg);
    }

}