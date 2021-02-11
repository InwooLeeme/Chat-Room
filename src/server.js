// Server side
import {join} from "path";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import socketIO from "socket.io";

const app = express();

const PORT = 5000;

const home = (req, res) => res.render("home")

app.set("views", join(__dirname,"views"));
app.set('view engine', 'pug');
app.use(helmet());
app.use(morgan('dev'));
app.use(express.static(join(__dirname,"static")));
app.get("/", home)

const server = app.listen(PORT, () => console.log(`Server is Running on PORT :${PORT}`));

const io = socketIO.listen(server);
