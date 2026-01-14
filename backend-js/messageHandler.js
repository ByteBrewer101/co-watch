
function createMessage(message){

    const currMessage = {
        msg : message,
        sent : new Date()
    }
return currMessage
}


export function sendMessageOnEvent(message,socket,eventName){
    const currMessage = createMessage(message);
    socket.emit(`${eventName}`,currMessage);
}



//1 joinroom
//2 disconnect from room 
//3 pause 
//4 play
//5 chat



//alag -> timestamp 
// 5 sync 


