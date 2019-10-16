// var user = {
//   screen_name: 'maxmustermann'};
// function $(q){
//   res = document.getElementById(q);
//   return res;
// }
//
// function sendMessage(msg){
//   updateUI(msg);
// }
//
// function updateUI(data){
//   var wrap = document.createElement('li');
//   wrap.className = "me";
//   var title = document.createElement('b');
//   var name = document.createElement('span');
//   var avatar = document.createElement('img');
//   var content = document.createElement('span');
//   name.innerHTML = data.user.screen_name + " ";
//   avatar.src = data.user.avatar;
//   content.innerHTML = data.text;
//   content.className = "text";
//   avatar.className = "ava";
//   title.appendChild(name);
//   title.appendChild(avatar);
//   wrap.appendChild(title);
//   wrap.appendChild(content);
//   $('chat-list').appendChild(wrap);
//   $('text').value="";
// }
//
// function onEnter(){
//   var txt = $('text').value;
//   var msg = {
//     user: {
//       screen_name: 'Max Mustermann',
//       avatar: 'http://diggwithme.files.wordpress.com/2012/09/new-default-twitter-avatar.jpg'
//     },
//     text: txt
//   };
//   console.log(msg);
//   sendMessage(msg);
//   $('chat-list').scrollTo(0, $('chat-list').innerHeight);
// }
// var inp = $('text');
// inp.onkeydown = function(e) {
//     if (e.keyCode == 13){
//        onEnter();
//     }
// };

let form = new Form({
    currentUserName: 'admin',
    interlocutorNameId: 'iName',
    members: [
        {name: 'Леша', avatar: 'http://diggwithme.files.wordpress.com/2012/09/new-default-twitter-avatar.jpg', id: 1},
        {name: 'name2', avatar: 'http://diggwithme.files.wordpress.com/2012/09/new-default-twitter-avatar.jpg', id: 2},
        {name: 'name3', avatar: 'http://diggwithme.files.wordpress.com/2012/09/new-default-twitter-avatar.jpg', id: 3}
    ],
    messages: [
        {me: true, text: 'first test message', user: {screen_name: 'Гость', avatar: 'http://diggwithme.files.wordpress.com/2012/09/new-default-twitter-avatar.jpg'}},
        {me: false, text: 'second test message', user: {screen_name: 'Пользователь', avatar: 'http://diggwithme.files.wordpress.com/2012/09/new-default-twitter-avatar.jpg'}},
        {me: false, text: 'third test message', user: {screen_name: 'Пользователь', avatar: 'http://diggwithme.files.wordpress.com/2012/09/new-default-twitter-avatar.jpg'}},
        {me: true, text: 'fourth test message', user: {screen_name: 'Гость', avatar: 'http://diggwithme.files.wordpress.com/2012/09/new-default-twitter-avatar.jpg'}},
    ],
    beforeSend: function (msg) {
        socketChat.send(msg);
        console.log(socketChat);
    },
    contactList: [
        {'userNema': 'dfdf', 'userId': 24, 'avatar': 'url'}
    ]
});

form.addMember({name: 'Вася', avatar: 'http://diggwithme.files.wordpress.com/2012/09/new-default-twitter-avatar.jpg', id: 1});
console.log(form);

let socketChat = new SocketChat({
    request: 'user_id=123&chat_id=321',
    onError: function (evt) {
        console.log(evt);
    },
    onOpen: function (evt) {
        form.updateElement('interlocutorUserName', 'Вася');
        console.log('Ура', evt);
    }
});

// form.updateElement('interlocutorUserName', 'User');

// test.renderText(test2, test);