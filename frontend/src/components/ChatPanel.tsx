import { useContext, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlobalContext } from "@/ContextApi/Contexts";
import { MessageSquare, Send, User, X, Sparkles } from "lucide-react";
import type { ChatMessage } from "@/utils/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getUserDetails } from "@/utils/helper.utils";

interface ChatPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
    const currUser = getUserDetails();
    const { msgs, sendMessage, count } = useContext(GlobalContext) as {
        msgs: ChatMessage[];
        sendMessage: (msg: ChatMessage) => void;
        count: number;
        roomId: string;
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
        <div
            className={`
        h-full bg-card border-l flex flex-col
        transition-[width,opacity] duration-300 ease-out
        ${isOpen ? "w-[360px] opacity-100" : "w-0 opacity-0 overflow-hidden"}
      `}
            style={{ willChange: "width, opacity" }}
        >
            {/* Header - Keeping original gradient colors */}
            <div className="flex-shrink-0 p-4 border-b bg-gradient-to-r from-primary/5 to-pink-500/5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-primary to-pink-600 p-2 rounded-lg">
                            <MessageSquare className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold">Live Chat</h2>
                            <p className="text-sm text-muted-foreground">
                                Room: {currUser?.roomId || "Unknown"}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="gap-1">
                            <User className="h-3 w-3" />
                            {count || 1}
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
            </div>

            {/* Chat messages area */}
            <div className="flex-1 overflow-y-auto p-4">
                {msgs.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
                        <Card className="border-dashed bg-transparent">
                            <CardContent className="p-6 text-center">
                                <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                                <h3 className="text-lg font-medium mb-2">No messages yet</h3>
                                <p className="text-sm">Start the conversation!</p>
                            </CardContent>
                        </Card>
                    </div>
                )}

                <div className="space-y-3">
                    {msgs.map((m: ChatMessage, idx: number) => {
                        const isYou = m.userName === "You";
                        return (
                            <div
                                key={idx}
                                className={`flex ${isYou ? "justify-end" : "justify-start"} animate-in fade-in-0 slide-in-from-bottom-2 duration-200`}
                                style={{ animationDelay: `${Math.min(idx * 30, 150)}ms` }}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl p-3 relative ${isYou
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
                                    <div
                                        className={`absolute bottom-2 right-2 flex items-center gap-1 text-xs ${isYou ? "opacity-90" : "text-muted-foreground"
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
            </div>

            {/* Input area */}
            <div className="flex-shrink-0 p-4 border-t bg-background/50 backdrop-blur-sm">
                <div className="flex gap-2">
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
                    <Button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        size="icon"
                        className="h-9 w-9 bg-gradient-to-r from-primary to-pink-600 hover:from-primary/90 hover:to-pink-600/90"
                    >
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
