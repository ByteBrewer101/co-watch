"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleConnection = HandleConnection;
const __1 = require("..");
function HandleConnection(Socket) {
    Socket.on('joinRoom', (msg) => {
        console.log(Socket.id, "is joining", msg.roomName, "with id ", msg.roomId);
        Socket.join(msg.roomId);
    });
    //send to all
    Socket.on('roomMessage', (msg) => {
        __1.io.to(msg.roomId).emit('roomMessage', msg.message);
    });
}
