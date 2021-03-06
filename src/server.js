// Server side
import {join} from "path";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import socketIO from "socket.io";
import events from "./events";

const app = express();

const PORT = 5000;

const home = (req, res) => res.render("home", { events: JSON.stringify(events) });

app.use(helmet({
    contentSecurityPolicy: false,
  }));
app.use(morgan('dev'));
app.set("views", join(__dirname,"views"));
app.set('view engine', 'pug');
app.use(express.static(join(__dirname,"static")));
app.get("/", home)

const server = app.listen(PORT, () => console.log(`Server is Running on PORT :${PORT}`));

const io = socketIO(server);

io.on("connection", socket => {
    socket.on(events.setNickname, ({nickname}) => {
        socket.nickname = nickname;
    });
    socket.on(events.sendMsg, ({message}) => {
        socket.broadcast.emit(events.newMsg, {message, nickname:socket.nickname});
    });
});