
function createMessage(message) {

    const currMessage = {
        msg: message,
        sent: new Date()
    }
    return currMessage
}


function sendMessageOnEvent(message, socket, eventName) {
    const currMessage = createMessage(message);
    socket.emit(`${eventName}`, currMessage);
}







function sendMessageToRoom(msg, roomId) {


}



function HandleChat(msg, roomId) {

    //send msg to roomid 

}




//1 joinroom
//2 disconnect from room
//3 pause
//4 play
//5 chat



//alag -> timestamp
// 5 sync 

module.exports = {
    sendMessageOnEvent,
    sendMessageToRoom,
    HandleChat
};
