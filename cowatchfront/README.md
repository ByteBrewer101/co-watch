# Co-Watch Frontend

A beautiful, real-time chat application built with React and Socket.IO.

## Features

✨ **Modern UI Design**
- Glassmorphism effects with backdrop blur
- Vibrant gradient colors and smooth animations
- Responsive design for mobile and desktop
- Dark theme with premium aesthetics

🚀 **Real-time Communication**
- Socket.IO integration for instant messaging
- Join rooms with username and room ID
- System notifications for connection events
- Auto-scroll to latest messages

💬 **Chat Functionality**
- Send and receive messages in real-time
- Visual distinction between user and system messages
- Timestamp for each message
- Keyboard shortcuts (Enter to send)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on port 5000

## Installation

1. Navigate to the frontend directory:
```bash
cd cowatchfront
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Start the Backend Server (Required)

First, make sure the backend server is running:

```bash
cd ../backend-js
npm install  # if not already installed
node index.js
```

The backend should be running on `http://localhost:5000`

### Start the Frontend Development Server

In a new terminal, navigate to the frontend directory and run:

```bash
cd cowatchfront
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

1. **Join a Room**
   - Enter your username
   - Enter a room ID (any string, e.g., "room1")
   - Click "Join Room"

2. **Start Chatting**
   - Type your message in the input field
   - Press Enter or click "Send"
   - Messages will be broadcast to all users in the same room

3. **Multiple Users**
   - Open multiple browser tabs/windows
   - Join the same room with different usernames
   - Chat in real-time!

## Project Structure

```
cowatchfront/
├── src/
│   ├── components/
│   │   ├── JoinRoom.jsx      # Join room screen
│   │   └── ChatRoom.jsx      # Chat interface
│   ├── services/
│   │   └── socketService.js  # Socket.IO service
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── package.json              # Dependencies
└── vite.config.js            # Vite configuration
```

## Socket.IO Events

### Emitted Events (Frontend → Backend)
- `joinRoom` - Join a chat room with username and room ID
- `sendChat` - Send a chat message to the room
- `sendCtrl` - Send control messages (for future features)

### Received Events (Backend → Frontend)
- `message` - Receive chat messages from other users
- `system` - Receive system notifications
- `ctrlMessage` - Receive control messages

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **Socket.IO Client** - Real-time WebSocket communication
- **CSS3** - Modern styling with animations and effects
- **Google Fonts (Inter)** - Premium typography

## Customization

### Change Backend URL

Edit `src/services/socketService.js`:

```javascript
const SOCKET_URL = 'http://your-backend-url:port';
```

### Modify Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --color-primary: hsl(250, 84%, 54%);
  --color-secondary: hsl(280, 70%, 60%);
  /* ... more variables */
}
```

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Troubleshooting

### Cannot connect to backend
- Ensure the backend server is running on port 5000
- Check CORS settings in backend `index.js`
- Verify the Socket.IO URL in `socketService.js`

### Messages not appearing
- Check browser console for errors
- Ensure you're using the same room ID
- Verify Socket.IO connection status

## Future Enhancements

- User list showing active participants
- Private messaging
- Message history persistence
- File sharing
- Video synchronization controls
- Emoji support
- Typing indicators

## License

MIT

---

Built with ❤️ using React and Socket.IO
