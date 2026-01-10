"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleConnection = HandleConnection;
const __1 = require("..");
function HandleConnection(Socket) {
    console.log(Socket.id, "is connected");
    Socket.on('joinRoom', (msg) => {
        if (!msg.roomId) {
            console.log("Unable to join, roomId missing");
            return;
        }
        else {
            console.log(Socket.id, "is joining", msg.roomName, "with id ", msg.roomId);
            Socket.join(msg.roomId);
        }
    });
    //create Room
    //send to all
    Socket.on('roomMessage', (msg) => {
        __1.io.to(msg.roomId).emit('roomMessage', msg.message);
    });
}
