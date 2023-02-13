const { Server } = require("socket.io");
const socketIo = require("socket.io");
const http = require('http');
const express = require("express");
const app= express();
const server = http.createServer(app);
const io = new Server(server);

const startSocketIOConnection = () => {
    server.listen(3002, () => console.log('socket listening on port 3002'))
    io.on('connection', (socket) => {
        console.log('a user connected');
    });
};

const sendMessageToClients = (messageName, args) => {
    io.emit(messageName, args);
};

module.exports = {
    startSocketIOConnection,
    sendMessageToClients
}
