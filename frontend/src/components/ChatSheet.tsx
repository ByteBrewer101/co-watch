import { useContext, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { GlobalContext } from "@/ContextApi/Contexts";
import { MessageSquare, Send, User, X, Sparkles } from "lucide-react";
import type { ChatMessage } from "@/utils/types";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ChatSheetProps {
  onClose?: () => void;
}

export function ChatSheet({ onClose }: ChatSheetProps) {
  const { msgs, sendMessage, userCount, roomId } = useContext(GlobalContext) as {
    msgs: ChatMessage[];
    sendMessage: (msg: ChatMessage) => void;
    userCount: number; // Add this to your context
    roomId: string;    // Add this to your context
  };
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [msgs]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      userName: "You",
      msg: input,
      timestamp: new Date().toISOString(),
    };

    sendMessage(newMessage);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const messageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.05,
        type: "spring" as const,
        stiffness: 100
      }
    })
  };

  return (
    <SheetContent side="right" className="w-full sm:w-[400px] p-0 border-l">
      <SheetHeader className="p-6 border-b bg-gradient-to-r from-primary/5 to-pink-500/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-primary to-pink-600 p-2 rounded-lg">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <SheetTitle className="text-xl font-bold">Live Chat</SheetTitle>
              <p className="text-sm text-muted-foreground">
                Connected to room: {roomId || "/room-id/"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="gap-1">
              <User className="h-3 w-3" />
              {userCount || 1}
            </Badge>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetHeader>

      <div className="flex flex-col h-[calc(100vh-73px)]">
        {/* Chat messages area */}
        <div className="flex-1 overflow-y-auto p-4">
          <AnimatePresence>
            {msgs.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-muted-foreground p-8"
              >
                <Card className="border-dashed bg-transparent">
                  <CardContent className="p-6 text-center">
                    <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-medium mb-2">No messages yet</h3>
                    <p className="text-sm">Start the conversation!</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <div className="space-y-3">
              {msgs.map((m: ChatMessage, idx: number) => {
                const isYou = m.userName === "You";
                return (
                  <motion.div
                    key={idx}
                    custom={idx}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex ${isYou ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 relative ${
                        isYou
                          ? "bg-gradient-to-r from-primary to-pink-600 text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {/* Username */}
                      {!isYou && (
                        <div className="flex items-center gap-2 mb-1">
                          <div className="bg-gradient-to-r from-primary to-pink-500 w-2 h-2 rounded-full"></div>
                          <p className="text-xs font-medium">{m.userName}</p>
                        </div>
                      )}
                      
                      {/* Message text */}
                      <p className="text-sm break-words pr-14 pb-1">{m.msg}</p>

                      {/* Timestamp */}
                      <div className={`absolute bottom-2 right-2 flex items-center gap-1 text-xs ${
                        isYou ? "opacity-90" : "text-muted-foreground"
                      }`}>
                        {formatTime(m.timestamp)}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </AnimatePresence>
        </div>

        {/* Input area */}
        <div className="p-4 border-t bg-background/50 backdrop-blur-sm">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex gap-2"
          >
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
              onKeyDown={handleKeyDown}
              className="flex-1"
              autoComplete="off"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleSend} 
                disabled={!input.trim()}
                size="icon"
                className="h-9 w-9"
              >
                <Send className="h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </SheetContent>
  );
}