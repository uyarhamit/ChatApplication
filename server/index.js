const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoDbConnection = require("./database/db")();
const MessageTable = require("./model/Message");

app.use(cors());
const PORT = 5000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket) => {

    socket.on('login', (data) => {
        socket.join(data);
        MessageTable.find({
            room: data
        }).then((msg) => {
            if (msg.length) {
                io.to(socket.id).emit('oldMessages', msg);
            }
        }).catch((err) => {
            console.log(err);
        })
    })

    socket.on('sendMessage', (data) => {
        data.createdDate = new Date(Date.now());
        new MessageTable(data).save();
        io.in(data.room).emit('messageResponse', data);
    })
})

server.listen(PORT, () => {
    console.log(`Server listening ${PORT}`);
})