import type React from "react";
import { GlobalContext } from "./Contexts";
import { useState, useEffect } from "react";
import { SocketManager } from "@/sockets/socketManager";
import { toast } from "sonner";

// ---------------- Types ----------------
interface ChatMessage {
  userName: string;
  msg: string;
}

interface SystemMessage {
  msg: string;
}

interface ChildrenTypes {
  children: React.ReactNode;
}

export function GlobalProvider({ children }: ChildrenTypes) {
  const [msgs, setMsgs] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const socketManager = SocketManager.getSocketInstance();
    socketManager.connect();
    const socket = socketManager.getSocket();

    socket.on("system", (msg: SystemMessage) => {
      toast.success(msg.msg);
    });

    socket.on("message", (msg: ChatMessage) => {
      toast.success(msg.msg);
      setMsgs((prev) => [...prev, msg]);
    });

    return () => {
      socketManager.disconnect();
    };
  }, []);

  return (
    <GlobalContext.Provider value={{ msgs, setMsgs }}>
      {children}
    </GlobalContext.Provider>
  );
}
