import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SocketManager } from "@/sockets/socketManager";
import { useNavigate } from "react-router-dom";


export function UserRegisterForm() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const nav = useNavigate();

 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const joinMessage = {
        roomId : roomId,
        userName : username
    }

    const socket = SocketManager.getSocketInstance().getSocket()

    socket.emit("joinRoom",joinMessage)

    if (!username.trim() || !roomId.trim()) {
      alert("Both fields are required.");
      return;
    }

    const message = {
      username,
      roomId,
    };

    socket?.emit("joinRoom", message);

    console.log("Join room event sent:", message);

    if(socket){
        nav("/main")
    }

    
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>New User</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="roomId">Room ID</Label>
              <Input
                id="roomId"
                placeholder="Enter room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Join Room
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
