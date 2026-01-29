// components/VideoPlayer/ChatSheetTrigger.tsx
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  SheetTrigger,
} from "@/components/ui/sheet";
import { GlobalContext } from "@/ContextApi/Contexts";
import { MessageSquare } from "lucide-react";


export function ChatSheetTrigger()


 {
const {  rec, setRec } = useContext(GlobalContext) as {
 
  rec: number;
  setRec: React.Dispatch<React.SetStateAction<number>>;
};

function handleClick(){
  setRec(0)
  // fsToggle(false)

}


  return (
    <SheetTrigger asChild>
      <Button 
        size="icon"
        variant="ghost"
        className="h-10 w-10 hover:bg-purple-600/30 text-purple-400 relative"
        title="Open chat"
        onClick={handleClick}
      >
        <MessageSquare className="h-5 w-5" />
        {rec > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {rec}
          </span>
        )}
      </Button>
    </SheetTrigger>
  );
}