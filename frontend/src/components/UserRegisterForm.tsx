import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Sparkles, Users, Video, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function UserRegisterForm() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsJoining(true);

    const joinMessage = {
      roomId: roomId,
      userName: username,
    };

    if (!username.trim() || !roomId.trim()) {
      toast.error("Error", {
        description: "Both fields are required.",
      });
      setIsJoining(false);
      return;
    }

    try {
      // const socket = SocketManager.getSocketInstance().getSocket();
      // socket.emit("joinRoom", joinMessage);
      localStorage.setItem("userDetails", JSON.stringify(joinMessage));

      console.log("Join room event sent:", joinMessage);

      // Add a small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/main");
    } catch (error) {
      console.error("Error joining room:", error);
      toast.error("Error", {
        description: "Failed to join room. Please try again.",
      });
      setIsJoining(false);
    }
  };

  const generateRandomRoomId = () => {
    const randomRoomId = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();
    setRoomId(randomRoomId);

    // Optional: Show toast notification
    toast.success("Room ID Generated", {
      description: `Use ${randomRoomId} to share with friends`,
    });
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="w-full"
    >
      <Card className="border-0 shadow-xl bg-card">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl md:text-3xl">
                Join a Room
              </CardTitle>
              <CardDescription>
                Start watching together in seconds
              </CardDescription>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-8 w-8 text-primary" />
            </motion.div>
          </div>
        </CardHeader>

        <CardContent>
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-2">
              <Label htmlFor="username" className="text-base">
                <Users className="inline-block w-4 h-4 mr-2" />
                Username
              </Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="roomId" className="text-base">
                  <Video className="inline-block w-4 h-4 mr-2" />
                  Room ID
                </Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={generateRandomRoomId}
                  className="text-xs"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Random
                </Button>
              </div>
              <Input
                id="roomId"
                placeholder="Enter room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                required
                className="h-12 text-base"
              />
            </div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold"
                disabled={isJoining}
                size="lg"
              >
                {isJoining ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-5 w-5 border-2 border-current border-t-transparent rounded-full"
                    />
                    Joining Room...
                  </span>
                ) : (
                  "Join Room"
                )}
              </Button>
            </motion.div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 pt-6 border-t"
          >
            <p className="text-center text-sm text-muted-foreground">
              Don't have a room ID? Generate one and share with friends!
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
