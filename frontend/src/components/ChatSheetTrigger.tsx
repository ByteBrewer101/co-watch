// components/VideoPlayer/ChatSheetTrigger.tsx
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  SheetTrigger,
} from "@/components/ui/sheet";
import { GlobalContext } from "@/ContextApi/Contexts";
import { MessageSquare } from "lucide-react";
import type { ChatMessage } from "@/utils/types";

export function ChatSheetTrigger() {
 const { msgs } = useContext(GlobalContext) as {
     msgs: ChatMessage[];
   };


  return (
    <SheetTrigger asChild>
      <Button 
        size="icon"
        variant="ghost"
        className="h-10 w-10 hover:bg-purple-600/30 text-purple-400 relative"
        title="Open chat"
      >
        <MessageSquare className="h-5 w-5" />
        {msgs.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {msgs.length}
          </span>
        )}
      </Button>
    </SheetTrigger>
  );
}