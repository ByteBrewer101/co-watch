import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

class SocketService {
    constructor() {
        this.socket = null;
    }

    connect() {
        if (!this.socket) {
            this.socket = io(SOCKET_URL, {
                transports: ['websocket'],
                autoConnect: true,
            });

            this.socket.on('connect', () => {
                console.log('Connected to server:', this.socket.id);
            });

            this.socket.on('disconnect', () => {
                console.log('Disconnected from server');
            });

            this.socket.on('connect_error', (error) => {
                console.error('Connection error:', error);
            });
        }
        return this.socket;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    joinRoom(userName, roomId) {
        if (this.socket) {
            this.socket.emit('joinRoom', { userName, roomId });
        }
    }

    sendMessage(roomId, message) {
        if (this.socket) {
            this.socket.emit('sendChat', { roomId, msg: message });
        }
    }

    sendControl(ctrlType) {
        if (this.socket) {
            this.socket.emit('sendCtrl', { ctrlType });
        }
    }

    onMessage(callback) {
        if (this.socket) {
            this.socket.on('message', callback);
        }
    }

    onSystemMessage(callback) {
        if (this.socket) {
            this.socket.on('system', callback);
        }
    }

    onControlMessage(callback) {
        if (this.socket) {
            this.socket.on('ctrlMessage', callback);
        }
    }

    offMessage() {
        if (this.socket) {
            this.socket.off('message');
        }
    }

    offSystemMessage() {
        if (this.socket) {
            this.socket.off('system');
        }
    }

    offControlMessage() {
        if (this.socket) {
            this.socket.off('ctrlMessage');
        }
    }

    getSocket() {
        return this.socket;
    }
}

export default new SocketService();
