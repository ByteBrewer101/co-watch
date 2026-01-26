// components/VideoPlayer/VideoPlayer.tsx
import { useContext, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlobalContext } from "@/ContextApi/Contexts";
import { Play, Pause, RefreshCw, Maximize2, Minimize2 } from "lucide-react";
import { ChatSheetTrigger } from "./ChatSheetTrigger";
import type { ControlMessage } from "@/utils/types";

interface VideoPlayerProps {
  isChatOpen: boolean;
}

export function VideoPlayer({ isChatOpen }: VideoPlayerProps) {
  const { videoRef, SendControl } = useContext(GlobalContext) as { 
      videoRef: React.RefObject<HTMLVideoElement>,
      SendControl: (msg: ControlMessage) => void;
    };
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return; 
    
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handlePlay = () => {
    const currCtrl: ControlMessage = {
      type: "play"
    };
    SendControl(currCtrl);
    setIsPlaying(true);
  };

  const handlePause = () => {
    const currCtrl: ControlMessage = {
      type: "pause"
    };
    SendControl(currCtrl);
    setIsPlaying(false);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    if (videoRef.current) {
      videoRef.current.onplay = () => setIsPlaying(true);
      videoRef.current.onpause = () => setIsPlaying(false);
    }

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div 
      ref={videoContainerRef}
      className="relative w-full h-full flex flex-col bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden group"
    >
      {/* Video area - takes most of the space */}
      <div className={`flex-1 ${isChatOpen ? 'rounded-l-2xl rounded-tr-2xl' : 'rounded-2xl'} overflow-hidden`}>
        <video 
          ref={videoRef}
          className="w-full h-full object-contain bg-black"
          src="https://www.w3schools.com/html/mov_bbb.mp4"
        />
      </div>

      {/* Controls bar at the bottom */}
      <div className="h-10 bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button 
            onClick={isPlaying ? handlePause : handlePlay}
            size="icon"
            variant="ghost"
            className="h-10 w-10 hover:bg-white/20 text-white"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button 
            // onClick={handleSync}
            size="icon"
            variant="ghost"
            className="h-10 w-10 hover:bg-purple-600/30 text-purple-400"
            title="Sync"
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <ChatSheetTrigger />
          <Button 
            onClick={toggleFullscreen}
            size="icon"
            variant="ghost"
            className="h-10 w-10 hover:bg-white/20 text-white"
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Fullscreen floating controls */}
      {isFullscreen && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-2xl">
            <Button 
              onClick={isPlaying ? handlePause : handlePlay}
              size="icon"
              className="bg-white/20 hover:bg-white/30 h-12 w-12"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button 
              // onClick={handleSync}
              size="icon"
              className="bg-purple-600 hover:bg-purple-700 h-12 w-12"
            >
              <RefreshCw className="h-6 w-6" />
            </Button>
            <ChatSheetTrigger />
          </div>
        </div>
      )}
    </div>
  );
}