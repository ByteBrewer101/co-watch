const express = require("express");
const { Server } = require("socket.io");
const { sendMessage, sendMessageOnEvent } = require("./messageHandler");
const { activateUser } = require("./userManager");

const PORT = 5000
const app = express()

const currServer = app.listen(PORT,()=>{
    console.log("connected to ", PORT);
})


const io = new Server(currServer)


io.on("connection",(socket)=>{
    ioHandler(socket)
})


function ioHandler(socket){

    socket.on("joinRoom",(userDetails)=>{
        handleJoinRoom(userDetails,socket)
    })
    
    socket.on("sendChat",(msg)=>{
        handleChat(msg,io)
    })


}

function handleJoinRoom(userDetails,socket){
    const currUser = {
        ...userDetails,
        id : socket.id
    }
    if(userDetails.roomId){

        activateUser(currUser)
        socket.join(currUser.roomId)
        sendMessageOnEvent("Joined Successfully",socket,"system")
    }else{
        //reject
        sendMessageOnEvent("Invalid Payload",socket,"system")
        //dissconnect socket
        socket.disconnect(true);
    }

}




function handleChat(msgDetails,io){
    io.to(msgDetails.roomId).emit("message",msgDetails.msg)
}