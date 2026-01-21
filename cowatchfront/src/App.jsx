import { useState } from 'react';
import JoinRoom from './components/JoinRoom';
import WatchRoom from './components/WatchRoom';
import './index.css';

function App() {
    const [isJoined, setIsJoined] = useState(false);
    const [userName, setUserName] = useState('');
    const [roomId, setRoomId] = useState('');

    const handleJoinSuccess = (name, room) => {
        setUserName(name);
        setRoomId(room);
        setIsJoined(true);
    };

    return (
        <>
            {!isJoined ? (
                <JoinRoom onJoinSuccess={handleJoinSuccess} />
            ) : (
                <WatchRoom userName={userName} roomId={roomId} />
            )}
        </>
    );
}

export default App;
