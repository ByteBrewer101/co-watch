const UserManager = {
  users: [],
  setUser: function (userArray) {
    this.users = userArray;
  },
};

function activateUser(id, userName, roomName) {
  const currUser = { id, userName, roomName };

  UserManager.setUser([
    ...UserManager.users.filter((usr) => usr.id != id),
    currUser,
  ]);
}

function deactivateUser(id) {
  UserManager.setUser([...UserManager.users.filter((usr) => usr.id != id)]);
}

function getUser(id) {
  UserManager.users.find((usr) => usr.id == id);
}

function getUsersInRoom(roomId) {
  UserManager.users.filter((usr) => usr.roomId == roomId);
}









const express = require("express");

const PORT = 5000;
const app = express();

const currServer = app.listen(PORT, () =>
  console.log("you're connected to", PORT),
);

const io = new Server(currServer);

io.on("connection", (socket) => ioHandler(socket));

function ioHandler(socket) {
  socket.on("joinRoom", (userDetails) => handleJoinRoom(userDetails, socket));

  socket.on("sendChat", (msg) => handleSendChat(msg, io));
}

function handleJoinRoom(userDetails, socket) {
  const currUser = {
    ...userDetails,
    io: socket.io,
  };

  if (roomId) {
    activateUser(currUser.id, currUser.userName, currUser.roomName);
    socket.join(roomId);
  } else {
    socket.disconnect(true);
  }
}

function handleSendChat(msg, io) {
  io.on(msg.roomId).emit("message", msg.msg);
}
