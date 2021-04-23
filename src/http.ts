import express, { response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

import './database';
import { routes } from './routes'

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (require, response) => {
    return response.render("html/client.html");
})

export const http = createServer(app); //Criando protocolo http
export const io = new Server(http);    // Criando protocolo ws

io.on("connection", (socket: Socket) => {
    console.log("Se conectou", socket.id);
})

app.use(express.json());

app.use(routes);