class Form {

    paramsDefault = {
        chatListId: 'chat-list',
        userListId: 'user-list',
        userList: true,
        inputTextId: 'text',
        currentUserName: 'Гость',
        currentUserAvatar: 'http://diggwithme.files.wordpress.com/2012/09/new-default-twitter-avatar.jpg',
        beforeSend: function (msg) {

        },
        afterSend: function (msg) {

        }
    };

    constructor(params = {}) {
        this.params = this.merge(this.paramsDefault, params);
        this.chatList = this.ID(this.params.chatListId);
        this.userList = this.ID(this.params.userListId);
        if(!this.params.userList){
            this.userList.style.display = 'none';
        }
        this.inputText = this.ID(this.params.inputTextId);
        delete this.paramsDefault;
        this.inputText.onkeydown = function(e) {
            if (e.keyCode === 13){
                this.onEnter();
            }
        }.bind(this);
    }

    sendMessage(msg){
        this.params.beforeSend(msg);
        this.updateUI(msg);
        this.params.afterSend(msg);
    }

    onEnter(){
        let txt = this.inputText.value;
        let msg = {
            me: true,
            user: {
                screen_name: this.params.currentUserName,
                avatar: this.params.currentUserAvatar
            },
            text: txt
        };
        console.log(msg);
        this.sendMessage(msg);
        this.chatList.scrollTo(0, this.chatList.innerHeight);
    }

    updateUI(data){
        let wrap = document.createElement('li');
        if(data.me){
            wrap.className = "me";
        }
        let title = document.createElement('b');
        let name = document.createElement('span');
        let avatar = document.createElement('img');
        let content = document.createElement('span');
        name.innerHTML = data.user.screen_name + " ";
        avatar.src = data.user.avatar;
        content.innerHTML = data.text;
        content.className = "text";
        avatar.className = "ava";
        title.appendChild(name);
        title.appendChild(avatar);
        wrap.appendChild(title);
        wrap.appendChild(content);
        this.chatList.appendChild(wrap);
        this.inputText.value="";
    }


    ID(id) {
        return document.getElementById(id);
    }

    merge(target, source, errorHandler=null) {
        let sourceKeys = [];

        if (!target || typeof target !== 'object') {
            throw new TypeError('Target must be a valid object');
        }

        if (Array.isArray(source)) {
            for (let i = 0; i < source.length; i++) {
                sourceKeys.push(i);
            }
        } else if (source) {
            sourceKeys = Reflect.ownKeys(source);
        }

        // Iterate through all keys of the source object

        for (let i = 0; i < sourceKeys.length; i++) {
            const key = sourceKeys[i];
            const descriptor = Object.getOwnPropertyDescriptor(source, key);

            // Skip non-enumerable getters

            if (typeof descriptor.get === 'function' && !descriptor.enumerable) continue;

            if (typeof source[key] !== 'object' || source[key] === null) {
                // All non-object primitives or nulls

                try {
                    target[key] = source[key];
                } catch (err) {
                    // Catch and handle assignment errors

                    if (typeof errorHandler !== 'function') throw err;

                    errorHandler(err, target);
                }
            } else if (Array.isArray(source[key])) {
                // Arrays

                if (!target[key]) {
                    target[key] = [];
                }

                merge(target[key], source[key], errorHandler);
            } else {
                // Objects

                if (!target[key]) {
                    target[key] = {};
                }

                merge(target[key], source[key], errorHandler);
            }
        }

        return target;
    }

}