// Client side

const body = document.querySelector('body');
const form = document.getElementById("jsForm");
const input = document.querySelector(".jsinput");
const chatDisplay = document.querySelector(".chatDisplay");

const socket = io("/");

function sendMessage(message){
    socket.emit("newMessage", {message});
    const li = document.createElement("li");
    li.innerHTML = `
    <span class="author">${message}</span>
    `;
    chatDisplay.appendChild(li);
}

function handleMessageNotif(data){
    const {message} = data;
    console.log(message);
}

socket.on("messageNotif", handleMessageNotif);

function handleMessageSub(event){
    event.preventDefault();
    const {value} = input;
    input.value = "";
    sendMessage(message);
}

function init(){
    form.addEventListener("submit", handleMessageSub);
}

init();