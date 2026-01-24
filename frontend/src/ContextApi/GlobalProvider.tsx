import type React from "react";
import { GlobalContext } from "./Contexts";
import { useState, useEffect, useRef } from "react";
import { SocketManager } from "@/sockets/socketManager";
import { toast } from "sonner";
import type { Socket } from "socket.io-client";

interface ChatMessage {
  userName: string;
  msg: string;
  timestamp: string;
}

interface SystemMessage {
  msg: string;
}

interface ChildrenTypes {
  children: React.ReactNode;
}

export function GlobalProvider({ children }: ChildrenTypes) {
  const [msgs, setMsgs] = useState<ChatMessage[]>([]);
  const socketRef = useRef<Socket | null>(null);

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

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (msg: ChatMessage) => {
    if (!socketRef.current) return;
    console.log("curr message",msg);
    setMsgs((prev) => [...prev, msg]);
    socketRef.current.emit("sendChat", msg);
  };

  return (
    <GlobalContext.Provider value={{ msgs, sendMessage }}>
      {children}
    </GlobalContext.Provider>
  );
}