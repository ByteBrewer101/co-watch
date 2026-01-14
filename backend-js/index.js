const express = require("express");
const { Server } = require("socket.io");
const { sendMessage, sendMessageOnEvent } = require("./messageHandler");

const PORT = 5000
const app = express()


const currServer = app.listen(PORT,()=>{
    console.log("connected to ", PORT);
})



const io = new Server(currServer)



io.on("connection", (socket)=>{
   

    //activate user 
    console.log(socket.id);
    sendMessageOnEvent("you are connected", socket, "chat")

    
    socket.on("enterRoom",(roomName)=>{
        
        //create new user 
        //add to array
        //add to room 


    })
    


    //handle messages 

    socket.on("disconnect",()=>{
        console.log(socket.id, "has disconnected");

        //disconnect user
    })



})







