const express = require("express"); 
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;

const users = {}
const colors = {} 

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        io.emit("chat message", users[socket.id], msg);
    })
    socket.on("username", (name) => {
        users[socket.id] = name;
        io.to(socket.id).emit("username", name);
        io.emit("user-joined", name);
    });
    socket.on("disconnect", () => {
        var name = users[socket.id];
        delete users[socket.id];
        io.emit("user-left", name);
    })
})

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})