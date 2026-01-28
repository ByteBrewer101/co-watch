const express = require("express");
const { Server } = require("socket.io");
const { sendMessage, sendMessageOnEvent } = require("./messageHandler");
const { activateUser, getUserInfo, deactivateUser, getUsersInRoom } = require("./userManager");

const PORT = 5000;
const app = express();

const currServer = app.listen(PORT, () => {
  console.log("connected to ", PORT);
});

const io = new Server(currServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  ioHandler(socket);
});



function ioHandler(socket) {
  socket.on("joinRoom", (userDetails) => {
    handleJoinRoom(userDetails, socket);
  });

  socket.on("sendChat", (chatDetails) => {
    const currUser = getUserInfo(socket.id);

    console.log(currUser);
    const currChatDetails = {
      ...chatDetails,
      roomId: currUser.roomId,
      userName: currUser.userName,
    };
    handleChat(currChatDetails, socket);
  });
  socket.on("sendCtrl", (ctrlDetails) => {
    const currUser = getUserInfo(socket.id);
    if(currUser!=null){
    const currRoom = currUser.roomId;
    const currCtrlDetails = {
      ...ctrlDetails,
      roomId: currRoom,
    };
    handleControl(currCtrlDetails, io);
}
else{
  sendMessageOnEvent("No User Found", socket, "system");
  return
}});

  socket.on("disconnect", () => {
    deactivateUser(socket.id);
    console.log(socket.id, "disconnected");
  });
}

function handleJoinRoom(userDetails, socket) {
  const currUser = {
    ...userDetails,
    id: socket.id,
  };
  if (userDetails.roomId) {
    activateUser(currUser.id, currUser.userName, currUser.roomId);
    socket.join(currUser.roomId);
    sendMessageOnEvent("Joined Successfully", socket, "system");
    const numOfUsers = getUsersInRoom(currUser.roomId).length
    console.log(numOfUsers);
    sendMessageOnEvent(numOfUsers, socket, "userCount");
  } else {
    //reject
    sendMessageOnEvent("Invalid Payload", socket, "system");
    //dissconnect socket
    socket.disconnect(true);
  }
}


function handleChat(msgDetails, socket) {
  socket.to(msgDetails.roomId).emit("message", msgDetails);
}

function handleControl(ctrlDetails, io) {
  io.to(ctrlDetails.roomId).emit("ctrlMessage", ctrlDetails);
}
