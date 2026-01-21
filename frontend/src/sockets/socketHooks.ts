import { useEffect } from "react";
import { SocketManager } from "./socketManager";
import { toast } from "sonner";

export function useSocketHooks() {
  const socketInstance = SocketManager.getSocketInstance();
  const socket = socketInstance?.getSocket();

  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      toast.success("Connected to socket!");
    };

    const handleDisconnect = () => {
      toast.error("Disconnected from socket!");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    // 🔥 Force connect if not already connected
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, [socket]);

  return socket;
}
