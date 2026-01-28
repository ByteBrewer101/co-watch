import { useEffect, useState } from "react";
import { Sheet } from "@/components/ui/sheet";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ChatSheet } from "@/components/ChatSheet";
import { motion, AnimatePresence } from "framer-motion";
import { Users } from "lucide-react";
import { SocketManager } from "@/sockets/socketManager";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "@/utils/helper.utils";

export function MainPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const navigate = useNavigate();
  const currUser = getUserDetails();

  useEffect(() => {
    if (currUser) {
      const socket = SocketManager.getSocketInstance().getSocket();
      socket.emit("joinRoom", currUser);
    } else {
      navigate("/");
    }
  }, [currUser, navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background"
    >
      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <div className="container mx-auto px-4 py-4">
          {/* Header */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <div className="flex items-center justify-between">
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4"
              >
                <div className="bg-gradient-to-r from-primary to-pink-600 p-2 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Co-watch</h1>
                  <p className="text-sm text-muted-foreground">
                    Sync with friends in real-time
                  </p>
                </div>
              </motion.div>

              {currUser && (
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-4"
                >
                  <div>
                    <p className="text-2xl font-bold">
                      Welcome{" "}
                      <span className="text-pink-600">
                        {currUser?.userName || "Guest"}
                      </span>
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-4 min-h-0">
            <motion.div
              variants={itemVariants}
              className={`flex-1 ${
                isChatOpen ? "lg:w-[calc(100%-400px)]" : "w-full"
              } transition-all duration-300 flex items-start`}
            >
              <VideoPlayer isChatOpen={isChatOpen} />
            </motion.div>

            <AnimatePresence>
              {isChatOpen && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="lg:w-[400px] flex-shrink-0"
                >
                  <ChatSheet onClose={() => setIsChatOpen(false)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Sheet>
    </motion.div>
  );
}
