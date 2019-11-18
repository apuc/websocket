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
        // console.log('on message app', evt.data);
        let msg = JSON.parse(evt.data);
        let member = this.form.getInterlocutor();
        if(msg.user_id == this.interlocutorId || msg.chat_id == this.chatId){
            let formMsg = {
                me: false,
                user: {
                    screen_name: member.name,
                    avatar: member.avatar
                },
                text: msg.text
            };
            this.form.sendMessage(formMsg);
        }
        console.log(member);
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