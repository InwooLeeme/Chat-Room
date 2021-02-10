// Server side

import express from "express";

const app = express();

const PORT = 5000;

const home = (req, res) => res.send("Hello World")

app.get("/", home)


app.listen(PORT, () => console.log(`Server is Running on PORT :${PORT}`));
