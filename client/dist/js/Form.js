class Form {

    constructor(params = {}) {
        this.paramsDefault = {
            chatListId: 'chat-list',
            userListId: 'user-list',
            interlocutorNameId: 'interlocutorName',
            userList: true,
            inputTextId: 'text',
            currentUserName: 'Гость',
            interlocutorUserName: 'Гость',
            currentUserAvatar: 'http://diggwithme.files.wordpress.com/2012/09/new-default-twitter-avatar.jpg',
            members: [],
            membersId: 'members',
            beforeSend: function (msg) {

            },
            afterSend: function (msg) {

            },
            beforeAddMember: function (member) {

            },
            afterAddMember: function (member) {

            },
            beforeDeleteMember: function (id) {

            },
            afterDeleteMember: function (id) {

            }

        };
        this.params = this.merge(this.paramsDefault, params);
        this.chatList = this.ID(this.params.chatListId);
        this.userList = this.ID(this.params.userListId);
        this.interlocutorUserNameCont = this.ID(this.params.interlocutorNameId);
        this.interlocutorUserNameCont.innerHTML = this.params.interlocutorUserName;
        if (!this.params.userList) {
            this.userList.style.display = 'none';
        }
        for (let i = 0; i<this.params.members.length; i++){
            this.addMember(this.params.members[i], i);
        }
        this.inputText = this.ID(this.params.inputTextId);
        delete this.paramsDefault;
        this.inputText.onkeydown = function (e) {
            if (e.keyCode === 13) {
                this.onEnter();
            }
        }.bind(this);
    }

    sendMessage(msg) {
        this.params.beforeSend(msg);
        this.updateUI(msg);
        this.params.afterSend(msg);
    }

    updateElement(key, value) {
        this.params[key] = value;
        let contName = key + 'Cont';
        this[contName].innerHTML = value;
    }

    onEnter() {
        let txt = this.inputText.value;
        let msg = {
            me: true,
            user: {
                screen_name: this.params.currentUserName,
                avatar: this.params.currentUserAvatar
            },
            text: txt
        };
        console.log(msg);
        this.sendMessage(msg);
        this.chatList.scrollTo(0, this.chatList.innerHeight);
    }

    deleteMember(id) {
        this.params.beforeDeleteMember(id);
        let members = document.getElementById(this.params.membersId);
        let member = members.querySelector('li[data-id="'+id+'"]');
        this.params.members.splice(id, 1);
        member.remove();

        // refresh members DOM
        for (let i = 0; i < this.params.members.length; i++){
            this.addMember(this.params.members[i], i);
        }
        let member_test = members.querySelector('li[data-id="'+(id+1)+'"]');
        member_test.remove();
        this.params.afterDeleteMember(id);
    }

    addMember(member, id=null) {
        this.params.beforeAddMember(member);
        let users = document.getElementById(this.params.membersId);

        // if id is NULL set it to array next element
        if(id===null)
            id = this.params.members.length.toString();

        // try to find chat member with data-id=id in DOM
        let userLi=users.querySelector('li[data-id="'+id+'"]');

        // if didn't find any - create a new one
        if(!userLi)
            userLi = document.createElement('li');
        // if did find one - clear it
        else
            userLi.innerHTML="";

        userLi.setAttribute('data-id', id);

        // push an element into members array
        if(id >= this.params.members.length)
            this.params.members.push(member);
        // or changing an existing one
        else
            this.params.members[id]=member;

        let userP = document.createElement('p');
        let userImg = document.createElement('img');
        userImg.src=member.avatar;
        userImg.className = "ava";
        userImg.width = 22;
        users.appendChild(userLi);
        userLi.appendChild(userP);
        userP.appendChild(userImg);
        userP.innerHTML+=" @"+member.name;
        this.params.afterAddMember(member);
    }

    updateUI(data) {
        let wrap = document.createElement('li');
        if (data.me) {
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
        this.inputText.value = "";
    }


    ID(id) {
        return document.getElementById(id);
    }

    merge(target, source, errorHandler = null) {
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

                this.merge(target[key], source[key], errorHandler);
            } else {
                // Objects

                if (!target[key]) {
                    target[key] = {};
                }

                this.merge(target[key], source[key], errorHandler);
            }
        }

        return target;
    }

}