// pages/MainPage.tsx
import { useState } from "react";
import { Sheet } from "@/components/ui/sheet";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ChatSheet } from "@/components/ChatSheet";

export function MainPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Sheet onOpenChange={(open) => setIsChatOpen(open)}>
      <div className="h-screen w-full flex flex-col lg:flex-row gap-4 p-4 bg-gradient-to-br from-gray-950 to-black">
        {/* Main content area */}
        <div className={`flex-1 flex flex-col ${isChatOpen ? 'lg:w-[calc(100%-400px)]' : 'w-full'} transition-all duration-300`}>
          <VideoPlayer isChatOpen={isChatOpen} />
        </div>

        {/* Chat Sidebar - only visible when chat is open */} 
        {isChatOpen && (
          <div className="lg:w-[400px] flex-shrink-0">
            <ChatSheet onClose={() => setIsChatOpen(false)} />
          </div>
        )}
      </div>
    </Sheet>
  );
}