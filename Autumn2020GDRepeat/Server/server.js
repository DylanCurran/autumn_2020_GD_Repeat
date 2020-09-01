const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const app = express();

const clientPath ="$(__dirname)/../client";
console.log("serving static from $(clientPath)");

app.use(express.static(clientPath))

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (sock) => {
    console.log("a player connected");
    sock.emit("message", "Connected")});

server.on("error", (err) =>{console.error("server error",err);});

server.listen(8080,() => {
    console.log("Server started on 8080");
});