"use strict";
var express = require('express');
var http = require('http');
var io = require('socket.io');
var app = express();
var httpSrv = http.createServer(app);
var socketSrv = io(httpSrv);
var clients = [];
socketSrv.on('connection', function (socket) {
    console.log("Client connected: " + socket.client.id);
    clients.push(socket.client.id);
    socketSrv.emit("player-joined", clients);
    socket.on('position-changed', function (id, direction, jumping, moving, xPosition, yPosition) {
        console.log("User: " + id + " position changed: " + xPosition + "-" + yPosition);
        socketSrv.emit('position-changed', id, direction, jumping, moving, xPosition, yPosition);
    });
    socket.on("disconnect", function () {
        var index = clients.indexOf(socket.client.id);
        clients.splice(index, 1);
        socketSrv.emit("player-disconnected", socket.client.id);
    });
});
httpSrv.listen(3000, function () {
    console.log('listening on *:3000');
});
//# sourceMappingURL=server.js.map