// UserRegisterForm.tsx - Enhanced form component
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SocketManager } from "@/sockets/socketManager";
import { useNavigate } from "react-router-dom";
import { Sparkles, Users, Video } from "lucide-react";

export function UserRegisterForm() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsJoining(true);

    const joinMessage = {
      roomId: roomId,
      userName: username
    };

    if (!username.trim() || !roomId.trim()) {
      alert("Both fields are required.");
      setIsJoining(false);
      return;
    }

    try {
      const socket = SocketManager.getSocketInstance().getSocket();
      socket.emit("joinRoom", joinMessage);
      
      console.log("Join room event sent:", joinMessage);
      
      // Add a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      nav("/main");
    } catch (error) {
      console.error("Error joining room:", error);
      setIsJoining(false);
    }
  };

  return (
    <div className="w-full animate-fade-in-up">
      <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
        
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Join a Room
            </CardTitle>
            <Sparkles className="h-8 w-8 text-purple-500" />
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Start watching together in seconds
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Users className="h-4 w-4" />
                Username
              </Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-12 text-lg border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roomId" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Video className="h-4 w-4" />
                Room ID
              </Label>
              <Input
                id="roomId"
                placeholder="Enter room ID or create new"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                required
                className="h-12 text-lg border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 transition-all"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              disabled={isJoining}
            >
              {isJoining ? (
                <span className="flex items-center gap-2">
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Joining...
                </span>
              ) : (
                "Join Room"
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-gray-600 dark:text-gray-400">
              Don't have a room? 
              <Button 
                variant="link" 
                className="text-purple-600 dark:text-purple-400 ml-1"
                onClick={() => {
                  const randomRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
                  setRoomId(randomRoomId);
                }}
              >
                Generate a random room ID
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}