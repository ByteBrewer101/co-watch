import { Card } from "@/components/ui/card";
import { SocketManager } from "@/sockets/socketManager";
import { v4 as uuidv4 } from "uuid";

import { toast } from "sonner";


export function Homepage(){
    

  function handleCreate(){
    // const currSocket = SocketManager.getSocketInstance()

    const currId = uuidv4();
    toast(currId)

  }

  function handleJoin(){
    // const currSocket = SocketManager.getSocketInstance()



  }

    
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-[30%] h-[30%] gap-10 items-center justify-center flex " >

        <Card onClick={handleCreate} className="w-full h-full items-center justify-center flex hover:bg-white/10 transition-all ease-in-out duration-200 text-xl font-bold cursor-pointer " >Create</Card>
        <Card onClick={handleJoin} className="w-full h-full items-center justify-center flex hover:bg-white/10 transition-all ease-in-out duration-200 text-xl font-bold cursor-pointer " >Join</Card>
        </div>
      </div>
    );
}