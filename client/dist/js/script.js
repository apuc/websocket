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
    test: 123,
    currentUserName: 'admin',
    interlocutorUserName: 'Kirill',
    interlocutorNameId: 'iName',
    beforeSend: function (msg) {
        console.log(msg);
    }
});
console.log(form);

form.updateElement('interlocutorUserName', 'User');

// test.renderText(test2, test);
console.log(form);