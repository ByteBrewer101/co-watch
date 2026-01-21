import { useState } from 'react';
import socketService from '../services/socketService';

function JoinRoom({ onJoinSuccess }) {
    const [userName, setUserName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [isJoining, setIsJoining] = useState(false);
    const [error, setError] = useState('');

    const handleJoinRoom = (e) => {
        e.preventDefault();

        if (!userName.trim() || !roomId.trim()) {
            setError('Please enter both username and room ID');
            return;
        }

        setIsJoining(true);
        setError('');

        // Connect to socket
        const socket = socketService.connect();

        // Listen for system messages
        socketService.onSystemMessage((messageObj) => {
            const message = typeof messageObj === 'object' ? messageObj.msg : messageObj;
            if (message === 'Joined Successfully') {
                setIsJoining(false);
                onJoinSuccess(userName, roomId);
            } else if (message === 'Invalid Payload') {
                setIsJoining(false);
                setError('Failed to join room. Please try again.');
                socketService.disconnect();
            }
        });

        // Handle connection errors
        socket.on('connect_error', () => {
            setIsJoining(false);
            setError('Unable to connect to server. Please check if the backend is running.');
        });

        // Join the room
        socketService.joinRoom(userName, roomId);
    };

    return (
        <div className="container">
            <div className="card">
                <h1>Co-Watch</h1>
                <p>Join a room to start chatting and watching together</p>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleJoinRoom}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            disabled={isJoining}
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="roomId">Room ID</label>
                        <input
                            id="roomId"
                            type="text"
                            placeholder="Enter room ID"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            disabled={isJoining}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn"
                        disabled={isJoining}
                    >
                        {isJoining ? (
                            <>
                                <span className="spinner"></span>
                                <span style={{ marginLeft: '8px' }}>Joining...</span>
                            </>
                        ) : (
                            'Join Room'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default JoinRoom;
