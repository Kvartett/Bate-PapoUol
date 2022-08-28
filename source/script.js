 let chat = [];
 let users = [];
 let name = "";

 function userName() {
    name = prompt('Qual seu nome de usuario?');
 }
 userName();

 function sendUser(response) {
    const user = {
        name: `${name}`
    }

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);
    promise.then(userData);
    promise.catch(anErrorUser);
 }
 sendUser();

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
 }
 
 function userData(response) {
    // resposta completa
    console.log("Resposta completa do get", response);

    // pegar apenas a lista com os dados que eu quero
    console.log("Resposta.data do get", response.data);
 }


