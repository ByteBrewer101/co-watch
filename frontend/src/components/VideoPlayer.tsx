import { useContext, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlobalContext } from "@/ContextApi/Contexts";
import { Play, Pause, RefreshCw, Maximize2, Minimize2 } from "lucide-react";
import { ChatSheetTrigger } from "./ChatSheetTrigger";
import type { ControlMessage } from "@/utils/types";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VideoPlayerProps {
  isChatOpen: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function VideoPlayer({ isChatOpen }: VideoPlayerProps) {
  const { videoRef, SendControl } = useContext(GlobalContext) as { 
    videoRef: React.RefObject<HTMLVideoElement>,
    SendControl: (msg: ControlMessage) => void;
  };
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const resetControlsTimer = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isFullscreen) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      setShowControls(true);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    if (videoRef.current) {
      videoRef.current.onplay = () => setIsPlaying(true);
      videoRef.current.onpause = () => setIsPlaying(false);
    }

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.div 
      ref={videoContainerRef}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      onMouseMove={resetControlsTimer}
      onTouchStart={resetControlsTimer}
      className="relative w-full h-full flex flex-col bg-card border rounded-2xl overflow-hidden group"
    >
      {/* Video area */}
      <div className="flex-1 relative overflow-hidden">
        <video 
          ref={videoRef}
          className="w-full h-full object-contain bg-black"
          src="https://www.w3schools.com/html/mov_bbb.mp4"
        />
        
        {/* Fullscreen floating controls */}
        <AnimatePresence>
          {isFullscreen && showControls && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <Card className="bg-background/80 backdrop-blur-md border-border/50">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            onClick={isPlaying ? handlePause : handlePlay}
                            size="icon"
                            variant="ghost"
                            className="h-12 w-12"
                          >
                            {isPlaying ? (
                              <Pause className="h-6 w-6" />
                            ) : (
                              <Play className="h-6 w-6" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {isPlaying ? "Pause" : "Play"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            // onClick={handleSync}
                            size="icon"
                            variant="ghost"
                            className="h-12 w-12"
                          >
                            <RefreshCw className="h-6 w-6" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Sync
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <ChatSheetTrigger />
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            onClick={toggleFullscreen}
                            size="icon"
                            variant="ghost"
                            className="h-12 w-12"
                          >
                            {isFullscreen ? (
                              <Minimize2 className="h-6 w-6" />
                            ) : (
                              <Maximize2 className="h-6 w-6" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom controls bar */}
      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="h-14 bg-background/80 backdrop-blur-sm border-t flex items-center justify-between px-4"
      >
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={isPlaying ? handlePause : handlePlay}
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isPlaying ? "Pause" : "Play"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  // onClick={handleSync}
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10"
                >
                  <RefreshCw className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Sync
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center gap-2">
          <ChatSheetTrigger />
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={toggleFullscreen}
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10"
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-5 w-5" />
                  ) : (
                    <Maximize2 className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </motion.div>
    </motion.div>
  );
}