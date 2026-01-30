import { io, type Socket } from "socket.io-client";
import { toast } from "sonner";

export class SocketManager {
  private static instance: SocketManager;
  private socket: Socket;

  
  private constructor() {
    const ip = "https://co-watch-p60v.onrender.com";
    this.socket = io(ip, {
      autoConnect: false,
      transports: ["websocket"],
    });
  }

  public static getSocketInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  connect(token?: string) {
    if (token) {
      this.socket.auth = { token };
    }

    if (!this.socket.connected) {
      this.socket.connect();

      this.socket.on("connect", () => {
        toast.success("Socket connected");
      });

      this.socket.on("connect_error", (err) => {
        toast.error("Socket connection failed");
        console.error(err);
      });
    }
  }

  disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
      toast.info("Socket disconnected");
    }
  }

  getSocket(): Socket {
    return this.socket;
  }
}
