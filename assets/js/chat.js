
// This is front side.

const displayChat = document.querySelector(".chatDisplay");
const jsForm = document.querySelector(".jsForm");
const chatForm = document.querySelector(".chatForm");
const input = jsForm.querySelector("input");
const nickname = localStorage.getItem("nickname");

const getTime = () => {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const currentTime = {
        "hour":hour,
        "minute":minute
    };
    return currentTime;
}

const displayMessage = (message, nickname) => {
    const timeInfo = getTime();
    const hour = timeInfo.hour;
    const minute = timeInfo.minute;
    const li = document.createElement("li");
    li.innerHTML = `
    <div class="author">${nickname}</div>
    <div class="messageContent">${message}</div>
    <span class="time">${hour >= 12 ? `오후` : `오전`}${hour}:${minute}</span>
    `;
    displayChat.appendChild(li);
}

const appendMsg = ({message, nickname}) => displayMessage(message, nickname);

const handleSubmit = (event) => {
    event.preventDefault();
    const {value} = input;
    window.socket.emit(window.events.sendMsg, {message:value});
    displayMessage(value, nickname);
    input.value = "";
}

if(chatForm){
    jsForm.addEventListener("submit", handleSubmit);
    window.socket.on(window.events.newMsg,appendMsg);
}