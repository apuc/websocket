class Form extends BaseObj {

    constructor(params = {}) {
        super();
        if (Object.keys(params).length !== 0) {
            this.init(params)
        }
    }

    init(params = {}) {
        this.paramsDefault = {
            chatListId: 'chat-list',
            userListId: 'user-list',
            interlocutorNameId: 'interlocutorName',
            userList: true,
            inputTextId: 'text',
            currentUserName: 'Гость',
            interlocutorUserName: 'Гость',
            interlocutorAvatar: 'http://diggwithme.files.wordpress.com/2012/09/new-default-twitter-avatar.jpg',
            currentUserAvatar: 'http://diggwithme.files.wordpress.com/2012/09/new-default-twitter-avatar.jpg',
            members: [],
            membersId: 'members',
            messages: [],
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

            },
            onClose: function () {

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
        this.updateMembersUI();
        this.inputText = this.ID(this.params.inputTextId);
        for (let i = 0; i < this.params.messages.length; i++) {
            this.updateUI(this.params.messages[i]);
        }
        delete this.paramsDefault;
        this.ID('close').onclick = function (e) {
            this.onClose();
            document.getElementsByClassName('widget')[0].style.display = 'none';
        };
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
        this.chatList.scrollTo(0, this.chatList.innerHeight);
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
        this.sendMessage(msg);
        this.onSendToServer(msg);
    }

    onSendToServer(msg) {

    }

    //deletes member and updates html
    deleteMember(id) {
        this.params.beforeDeleteMember(id);
        for (let i = 0; i < this.params.members.length; i++) {
            if (this.params.members[i].id === id) {
                this.params.members.splice(i, 1);
            }
        }
        this.updateMembersUI();
        console.log(this);
        this.params.afterDeleteMember(id);
    }

    //adds a new member and updates html
    addMember(member) {
        this.params.beforeAddMember(member);
        this.params.members.push(member);
        this.updateMembersUI();
        this.params.afterAddMember(member);
    }

    getMemberById(id) {
        for (let i = 0; i < this.params.members.length; i++) {
            if (this.params.members[i].id == id) {
                return this.params.members[i];
            }
        }

        return null;
    }

    getInterlocutor() {
        return {
            name: this.params.interlocutorUserName,
            avatar: this.params.interlocutorAvatar
        };
    }

    //clears members block and refill it
    updateMembersUI() {
        let members = document.getElementById(this.params.membersId);
        members.innerHTML = "";
        for (let i = 0; i < this.params.members.length; i++) {
            let userLi = document.createElement('li');
            let userP = document.createElement('p');
            let userImg = document.createElement('img');
            let button = document.createElement('button');
            button.className = "delete-button";
            button.setAttribute('data-id', this.params.members[i].id);
            button.onclick = function (e) {
                this.deleteMember(this.params.members[i].id)
            }.bind(this);
            userImg.src = this.params.members[i].avatar;
            userImg.className = "ava";
            userImg.width = 22;
            members.appendChild(userLi);
            userLi.appendChild(userP);
            userLi.appendChild(button);
            userP.appendChild(userImg);
            userP.innerHTML += " @" + this.params.members[i].name;
        }
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

}