 let chat = [];
 let name = "";
 let user = {};
 

 function userName() {
    name = prompt("What's your name?");
 }
 userName();


 function sendUser(response) {
    user = {
        name: `${name}`
    }

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);
    promise.catch(anErrorUser);
 }
 sendUser();
 const myInterval = setInterval(userStatus, 5000);


 function userStatus() {
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', user);
 }


 function getData(response) {
    console.log(response);

    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promise.then(userData);
    promise.catch(error);
 }


 function anErrorUser(error) {
    console.log(error.response.status);

    if (error.response.status === 400) {
        alert("Username in use, please enter another one!")
        name = prompt('Qual seu nome de usuario?');
        sendUser();
    }

 }


 function anError(error) {
    console.log(error);
    window.location.reload()
 }
 
 const myIntervalMessages = setInterval(getMessages, 3000);
 function getMessages(response) {
    const ul = document.querySelector('.chat');
    ul.innerHTML = "";

    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(messagesArrived);
    promise.catch(anError);
 }
  

 function messagesArrived(response) {
    chat = response.data;
    console.log(chat);

    renderMessages();
 }

 function renderMessages() {
    const ul = document.querySelector('.chat');
    ul.scrollIntoView();

    for (let i = 0; i < chat.length; i++) {
        if (chat[i].type === 'status') {
            ul.innerHTML = ul.innerHTML + `
            <li class="status feed">
                <span>(${chat[i].time})</span> <strong>${chat[i].from}</strong> ${chat[i].text}
            </li>`
        } else if (chat[i].type === "message") {
            ul.innerHTML = ul.innerHTML + `
            <li class="message feed">
                <span>(${chat[i].time})</span> <strong>${chat[i].from}</strong> para <strong>todos:<strong> ${chat[i].text}
            </li>`
        } else if (chat[i].to === name){
            ul.innerHTML = ul.innerHTML + `
            <li class="private feed">
                <span>(${chat[i].time})</span> <strong>${chat[i].from}</strong> para <strong>${chat[i].to}:</strong> ${chat[i].text}
            </li>`           
        }
    }
 }

 function sendMessage() {
    const messageElement = document.querySelector('.send');

    const newMessage = {
        from: `${name}`,
        to: `todos`,
        text: messageElement.value,
        type: `message`
    }

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', newMessage);
    promise.then(messagesArrived);
    promise.catch(anError);

    renderMessages();
 }

