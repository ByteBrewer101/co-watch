import type React from "react";
import { GlobalContext } from "./Contexts";
import { useState, useEffect, useRef } from "react";
import { SocketManager } from "@/sockets/socketManager";
import { toast } from "sonner";
import type { Socket } from "socket.io-client";
import { seekTo, videoPause, videoPlay } from "@/videoController/videoctrl";

interface ChatMessage {
  userName: string;
  msg: string;
  timestamp: string;
}

interface SystemMessage {
  msg: string;
}

interface ControlMessage {
  type: string;
  timeInSeconds?: number;
}

interface ChildrenTypes {
  children: React.ReactNode;
}

export function GlobalProvider({ children }: ChildrenTypes) {
  const [msgs, setMsgs] = useState<ChatMessage[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const socketManager = SocketManager.getSocketInstance();
    socketManager.connect();

    const socket = socketManager.getSocket();
    socketRef.current = socket;

    socket.on("system", (msg: SystemMessage) => {
      toast.success(msg.msg);
    });

    socket.on("message", (msg: ChatMessage) => {
      console.log(msg);
      setMsgs((prev) => [...prev, msg]);
    });

    socket.on("ctrlMessage", (msg: ControlMessage) => {
      const {type, timeInSeconds} = msg

      if (type === "play") {
        videoPlay(videoRef);
        console.log("play");
      } else if (type === "pause") {
        videoPause(videoRef);
        console.log("pause");
      } else if(type === "sync" && typeof timeInSeconds === "number"){
        seekTo(videoRef,timeInSeconds);
        console.log("sync");
      }else {
        console.log("Invalid type of ctrl");
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (msg: ChatMessage) => {
    if (!socketRef.current) return;
    console.log("curr message", msg);
    setMsgs((prev) => [...prev, msg]);
    socketRef.current.emit("sendChat", msg);
  };

  const SendControl = (msg : ControlMessage)=>{
    if(!socketRef.current) return;
    socketRef.current.emit("sendCtrl", msg)
  }

  return (
    <GlobalContext.Provider value={{ msgs, sendMessage, videoRef, SendControl }}>
      {children}
    </GlobalContext.Provider>
  );
}
