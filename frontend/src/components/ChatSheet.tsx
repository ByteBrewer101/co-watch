// components/ChatSheet/ChatSheet.tsx
import { useContext, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GlobalContext } from "@/ContextApi/Contexts";
import { MessageSquare, Send, User, Clock, X } from "lucide-react";
import type { ChatMessage } from "@/utils/types";

interface ChatSheetProps {
  onClose?: () => void;
}

export function ChatSheet({ onClose }: ChatSheetProps) {
 const { msgs, sendMessage } = useContext(GlobalContext) as {
     msgs: ChatMessage[];
     sendMessage: (msg: ChatMessage) => void;
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

  return (
    <SheetContent side="right" className="w-full sm:w-[400px] p-0 border-l border-gray-800 bg-gradient-to-b from-gray-900 to-black">
      <SheetHeader className="p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <SheetTitle className="text-xl font-bold text-white">Live Chat</SheetTitle>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-400 flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{msgs.length} messages</span>
            </div>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </SheetTrigger>
          </div>
        </div>
      </SheetHeader>

      <div className="flex flex-col h-[calc(100vh-73px)]">
        {/* Chat messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900/50 to-transparent">
          {msgs.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <MessageSquare className="h-16 w-16 mb-4 opacity-30" />
              <p className="text-lg font-medium">No messages yet</p>
              <p className="text-sm mt-2">Start the conversation!</p>
            </div>
          )}

          {msgs.map((m: ChatMessage, idx: number) => {
            const isYou = m.userName === "You";
            return (
              <div
                key={idx}
                className={`flex ${isYou ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 relative ${
                    isYou
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none"
                      : "bg-gray-800/50 text-gray-100 rounded-bl-none backdrop-blur-sm"
                  }`}
                >
                  {/* Username */}
                  {!isYou && (
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-2 h-2 rounded-full"></div>
                      <p className="text-sm font-semibold">{m.userName}</p>
                    </div>
                  )}
                  
                  {/* Message text */}
                  <p className="text-sm break-words pr-12">{m.msg}</p>

                  {/* Timestamp */}
                  <div className="absolute bottom-2 right-3 flex items-center gap-1 text-xs opacity-80">
                    <Clock className="h-3 w-3" />
                    {formatTime(m.timestamp)}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
              onKeyDown={handleKeyDown}
              className="flex-1 bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
              autoComplete="off"
            />
            <Button 
              onClick={handleSend} 
              disabled={!input.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 rounded-xl"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </SheetContent>
  );
}