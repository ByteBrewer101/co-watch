import { useContext, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GlobalContext } from "@/ContextApi/Contexts";

// ---------------- Types ----------------
interface ChatMessage {
  userName: string;
  msg: string;
  timestamp: string;
}

// ---------------- Video Component ----------------
export function VideoPlayer() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black rounded-xl">
      <video
        className="w-full h-full rounded-xl"
        controls
        src="https://www.w3schools.com/html/mov_bbb.mp4"
      />
    </div>
  );
}

// ---------------- Chat Sheet Component ----------------
export function ChatSheet() {
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

    sendMessage({
      userName: "You",
      msg: input,
      timestamp: new Date().toISOString(),
    });

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
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full">Open Chat</Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[400px] px-4 py-2 sm:w-[450px]">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">Chat</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full mt-4">
          {/* Chat messages area */}
          <div className="flex-1 overflow-y-auto space-y-4 p-3 border rounded-lg">
            {msgs.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <p className="text-sm">No messages yet</p>
                <p className="text-xs mt-1">Start the conversation!</p>
              </div>
            )}

            {msgs.map((m: ChatMessage, idx: number) => {
              const isYou = m.userName === "You";
              return (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    isYou ? "items-end" : "items-start"
                  }`}
                >
                  {/* Message bubble */}
                  <div
                    className={`relative max-w-[85%] rounded-xl p-1 ${
                      isYou
                        ? "bg-gray-900 text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-900 rounded-bl-sm"
                    }`}
                  >
                    {/* Username - only for other users */}
                    {!isYou && (
                      <p className="text-sm font-bold text-gray-800">
                        {m.userName}
                      </p>
                    )}
                    
                    {/* Message text */}
                    <p className="text-sm break-words pr-16">{m.msg}</p>

                    {/* Timestamp - positioned at bottom right with spacing */}
                    <div
                      className={`absolute bottom-1 right-0.5 text-xs flex items-center gap-1 ${
                        isYou ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      {formatTime(m.timestamp)}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
              onKeyDown={handleKeyDown}
              className="flex-1 border rounded-md px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
              autoComplete="off"
            />
            <Button 
              onClick={handleSend} 
              disabled={!input.trim()}
              className="rounded-md"
            >
              Send
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ---------------- Main Page ----------------
export function MainPage() {
  return (
    <div className="h-screen w-full flex gap-4 p-4">
      {/* Left: Video */}
      <div className="flex-1">
        <VideoPlayer />
      </div>

      {/* Right: Chat Trigger */}
      <div className="w-[200px] flex items-start justify-center">
        <ChatSheet />
      </div>
    </div>
  );
}