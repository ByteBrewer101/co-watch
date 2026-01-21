import { useContext, useState } from "react";
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
  const { msgs } = useContext(GlobalContext) as { msgs: ChatMessage[] }; // typed context
  const [input, setInput] = useState<string>("");

  // Optional: send message function
  // const sendMessage = () => { ... }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full">Open Chat</Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[400px] px-4 py-2 sm:w-[450px]">
        <SheetHeader>
          <SheetTitle>Chat</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full mt-4">
          {/* Chat messages area */}
          <div className="flex-1 overflow-y-auto space-y-3 p-2 border rounded-lg">
            {msgs.length === 0 && (
              <div className="text-sm text-gray-500">No messages yet</div>
            )}

            {msgs.map((m: ChatMessage, idx: number) => (
              <div
                key={idx}
                className={`max-w-[75%] p-2 rounded-md ${
                  m.userName === "You"
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-muted"
                }`}
              >
                {m.userName !== "You" && (
                  <p className="text-xs font-semibold">{m.userName}</p>
                )}
                <p>{m.msg}</p>
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
              className="flex-1 border rounded-md px-3 py-2"
            />
            <Button /*onClick={sendMessage}*/>Send</Button>
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
