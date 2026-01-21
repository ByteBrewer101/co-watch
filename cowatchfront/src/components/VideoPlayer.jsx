import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import socketService from '../services/socketService';

function VideoPlayer({ roomId }) {
    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [videoUrl, setVideoUrl] = useState('');
    const [inputUrl, setInputUrl] = useState('');
    const [isSyncing, setIsSyncing] = useState(false);

    // Listen for control messages from other users
    useEffect(() => {
        socketService.onControlMessage((ctrlData) => {
            setIsSyncing(true);

            if (ctrlData.type === 'play') {
                setIsPlaying(true);
            } else if (ctrlData.type === 'pause') {
                setIsPlaying(false);
            } else if (ctrlData.type === 'seek') {
                handleRemoteSeek(ctrlData.time);
            } else if (ctrlData.type === 'load') {
                handleRemoteLoad(ctrlData.url);
            }

            setTimeout(() => setIsSyncing(false), 500);
        });

        return () => {
            socketService.offControlMessage();
        };
    }, []);

    const handleRemoteSeek = (time) => {
        if (playerRef.current) {
            playerRef.current.seekTo(time);
            setCurrentTime(time);
        }
    };

    const handleRemoteLoad = (url) => {
        setVideoUrl(url);
        setInputUrl(url);
        setIsPlaying(false);
    };

    const togglePlayPause = () => {
        const newIsPlaying = !isPlaying;
        setIsPlaying(newIsPlaying);
        socketService.sendControl({ type: newIsPlaying ? 'play' : 'pause' });
    };

    const handleProgress = (state) => {
        // We only update current time if we are not currently dragging/seeking manually
        // or if we are not syncing from a remote seek
        if (!isSyncing) {
            setCurrentTime(state.playedSeconds);
        }
    };

    const handleDuration = (duration) => {
        setDuration(duration);
    };

    const handleProgressClick = (e) => {
        if (!playerRef.current || duration === 0) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        const newTime = pos * duration;

        playerRef.current.seekTo(newTime);
        setCurrentTime(newTime);
        socketService.sendControl({ type: 'seek', time: newTime });
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
    };

    const handleLoadVideo = () => {
        if (inputUrl.trim()) {
            setVideoUrl(inputUrl);
            setIsPlaying(true);
            socketService.sendControl({ type: 'load', url: inputUrl });
            socketService.sendControl({ type: 'play' });
        }
    };

    const formatTime = (seconds) => {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="video-container">
            <div className="url-input-container">
                <div className="url-input">
                    <input
                        type="text"
                        placeholder="Enter YouTube URL or video link"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleLoadVideo()}
                    />
                </div>
                <button onClick={handleLoadVideo} className="btn load-btn">
                    Load Video
                </button>
            </div>

            <div className="video-wrapper">
                {videoUrl ? (
                    <ReactPlayer
                        ref={playerRef}
                        url={videoUrl}
                        playing={isPlaying}
                        volume={volume}
                        width="100%"
                        height="100%"
                        onProgress={handleProgress}
                        onDuration={handleDuration}
                        onPlay={() => {
                            if (!isPlaying) {
                                setIsPlaying(true);
                                // Only emit if it wasn't triggered by a remote event to avoid loops
                                if (!isSyncing) socketService.sendControl({ type: 'play' });
                            }
                        }}
                        onPause={() => {
                            if (isPlaying) {
                                setIsPlaying(false);
                                if (!isSyncing) socketService.sendControl({ type: 'pause' });
                            }
                        }}
                        controls={false} // Hide native controls
                    />
                ) : (
                    <div className="video-placeholder">
                        <div className="video-placeholder-icon">🎬</div>
                        <div className="video-placeholder-text">
                            Enter a YouTube URL above to start watching together
                        </div>
                    </div>
                )}
            </div>

            <div className="video-controls">
                <button
                    className="control-btn primary"
                    onClick={togglePlayPause}
                    disabled={!videoUrl}
                    title={isPlaying ? 'Pause' : 'Play'}
                >
                    {isPlaying ? '⏸' : '▶'}
                </button>

                <div className="time-display">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>

                <div
                    className="progress-container"
                    onClick={handleProgressClick}
                >
                    <div
                        className="progress-bar"
                        style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                    />
                </div>

                <div className="volume-control">
                    <button className="control-btn" title="Volume">
                        {volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        style={{ width: '80px' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default VideoPlayer;
