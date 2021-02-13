// Client Side

const body = document.querySelector("body");
const display = document.querySelector(".chatDisplay");
const jsForm = document.querySelector(".jsForm");
const registerForm = document.querySelector(".registerForm");
const nicknameInput = registerForm.querySelector("input");
const chatForm = document.querySelector(".chatForm");

const NICKNAME = "nickname";
const LOGGEDOUT = "loggedOut"
const LOGGEDIN = "loggedIn";

const confirmLI = localStorage.getItem(NICKNAME);

const logIn = (nickname) => {
    const socket = io("/");         // 연결
    socket.emit("setNickname", {nickname});     // nickname을 이벤트로 전송
}

const askNickName = () => {
    const currentNickname = nicknameInput.value;
    localStorage.setItem(NICKNAME, currentNickname);
    logIn(currentNickname);
    registerForm.removeEventListener("submit", askNickName);
}

const init = () => {
    if(confirmLI === null){
        chatForm.id = LOGGEDOUT;
        registerForm.addEventListener("submit", askNickName);
    }
    else{
        chatForm.id = LOGGEDIN;
        registerForm.id = LOGGEDOUT;
        logIn(confirmLI);
    }
}

init();