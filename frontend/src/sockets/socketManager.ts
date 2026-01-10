import { io, type Socket } from "socket.io-client";
import { toast } from "sonner";

export class SocketManager {
  private static SocketInstance: SocketManager;
  private socket: Socket;

  private constructor() {
    this.socket = io("http://localhost:5000");
    this.socket.connect();
  }

  public static getSocketInstance() {
    if (!SocketManager.SocketInstance) {
      SocketManager.SocketInstance = new SocketManager();
    } else return SocketManager.SocketInstance;
  }
  connect() {
    if (!this.socket.connected) {
      this.socket.connect();
      toast.success("connected");
    }
  }

  disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  getSocket(){
    return this.socket;
  }
}