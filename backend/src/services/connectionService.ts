import { io } from "..";
import { joinMessage, roomMessage } from "../types/messageTypes"

export function HandleConnection(Socket:any){

    Socket.on('joinRoom',(msg:joinMessage)=>{
        console.log(Socket.id,"is joining", msg.roomName ,"with id ", msg.roomId);
        Socket.join(msg.roomId)

    })


    Socket.on('roomMessage',(msg:roomMessage)=>{
        io.to(msg.roomId).emit('roomMessage',msg.message)
    })


}