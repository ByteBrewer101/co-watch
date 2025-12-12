import { io } from "..";
import { joinMessage, roomMessage } from "../types/messageTypes"

export function HandleConnection(Socket:any){

    Socket.on('joinRoom',(msg:joinMessage)=>{
        if(!msg.roomId){
            console.log("Unable to join, roomId missing");
            return
        }
        else{
            console.log(Socket.id,"is joining", msg.roomName ,"with id ", msg.roomId);
            Socket.join(msg.roomId)
        }

    })

    //send to all
    Socket.on('roomMessage',(msg:roomMessage)=>{
        io.to(msg.roomId).emit('roomMessage',msg.message)
    })


}