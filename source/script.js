 let chat = [];
 let name = "";
 let user = {};
 
function logIn() {
    name = document.querySelector('.log').value;
    const start = document.querySelector('.start');
    start.classList.add('hide');
    sendUser();
}

 function sendUser(response) {
    user = {
        name: `${name}`
    }

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);
    promise.catch(anErrorUser);
    const myInterval = setInterval(userStatus, 5000);
 }
 

 function userStatus() {
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', user);
 }


 function getData(response) {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promise.then(userData);
    promise.catch(error);
 }


 function anErrorUser(error) {
    if (error.response.status === 400) {
        alert("Username in use, please enter another one!")
        name = prompt('Qual seu nome de usuario?');
        sendUser();
    }

 }


 function anError(error) {
    window.location.reload()
 }
 
 const myIntervalMessages = setInterval(getMessages, 1000);
 function getMessages(response) {
    const ul = document.querySelector('.chat');

    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(messagesArrived);
    promise.catch(anError);
 }


 function messagesArrived(response) {
    chat = response.data;

    renderMessages();
 }

 function renderMessages() {
    const ul = document.querySelector('.chat');
    ul.innerHTML = "";

    for (let i = 0; i < chat.length; i++) {
        if (chat[i].type === 'status') {
            ul.innerHTML = ul.innerHTML + `
            <li class="status feed">
                <span>(${chat[i].time})</span> <strong>${chat[i].from}</strong> ${chat[i].text}
            </li>`
        } else if (chat[i].type === "message") {
            ul.innerHTML = ul.innerHTML + `
            <li class="message feed">
                <span>(${chat[i].time})</span> <strong>${chat[i].from}</strong> para <strong>todos:</strong> ${chat[i].text}
            </li>`
        } else if (chat[i].to === name){
            ul.innerHTML = ul.innerHTML + `
            <li class="private feed">
                <span>(${chat[i].time})</span> <strong>${chat[i].from}</strong> para <strong>${chat[i].to}:</strong> ${chat[i].text}
            </li>`           
        }

        let lastMessage = ul.lastElementChild;
        lastMessage.scrollIntoView();
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
    promise.catch(anError);

    messageElement.value = "";
 }

