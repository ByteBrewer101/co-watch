export interface joinMessage {
    roomId : string,
    roomName : string,
}

export interface roomMessage{
    roomId:string,
    message:string
}



export const MessageTypes={

    Run_Play : 'play',
    Run_Pause : 'pause',
    Run_Sync : 'sync',
    Run_JoinRoom :'JoinRoom',    
}

