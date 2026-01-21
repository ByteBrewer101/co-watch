import { useState, useEffect, useRef } from 'react';
import socketService from '../services/socketService';

function ChatRoom({ userName, roomId }) {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Listen for incoming messages
        socketService.onMessage((message) => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + Math.random(),
                    content: message,
                    type: 'user',
                    timestamp: new Date().toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                },
            ]);
        });

        // Listen for system messages
        socketService.onSystemMessage((message) => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + Math.random(),
                    content: message,
                    type: 'system',
                    timestamp: new Date().toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                },
            ]);
        });

        // Listen for control messages
        socketService.onControlMessage((ctrlType) => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + Math.random(),
                    content: `Control: ${ctrlType}`,
                    type: 'system',
                    timestamp: new Date().toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                },
            ]);
        });

        // Cleanup listeners on unmount
        return () => {
            socketService.offMessage();
            socketService.offSystemMessage();
            socketService.offControlMessage();
        };
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();

        if (!inputMessage.trim()) {
            return;
        }

        // Send message to server
        socketService.sendMessage(roomId, inputMessage);

        // Clear input
        setInputMessage('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Co-Watch</h2>
                <div className="room-info">
                    <div className="room-id">Room: {roomId}</div>
                    <div className="username">@{userName}</div>
                </div>
            </div>

            <div className="messages-container">
                {messages.length === 0 ? (
                    <div className="message system">
                        Welcome to the chat! Start sending messages to connect with others in this room.
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={`message ${message.type}`}
                        >
                            <div className="message-content">
                                {message.content}
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-container">
                <div className="chat-input">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        autoFocus
                    />
                </div>
                <button
                    onClick={handleSendMessage}
                    className="btn send-btn"
                    disabled={!inputMessage.trim()}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatRoom;
