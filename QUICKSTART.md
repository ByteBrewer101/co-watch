# Co-Watch Application - Quick Start Guide

This guide will help you get both the backend and frontend running.

## 🚀 Quick Start

### Step 1: Start the Backend Server

Open a terminal and run:

```bash
cd backend-js
npm install
node index.js
```

You should see:
```
connected to 5000
```

### Step 2: Start the Frontend Application

Open a **NEW** terminal window and run:

```bash
cd cowatchfront
npm install
npm run dev
```

You should see something like:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Step 3: Open the Application

1. Open your browser and go to `http://localhost:3000`
2. You should see the Co-Watch join screen

### Step 4: Test the Chat

**Testing with Multiple Users:**

1. Open `http://localhost:3000` in your browser
2. Enter username: `User1` and room ID: `room1`
3. Click "Join Room"

4. Open a **NEW** browser tab or window
5. Go to `http://localhost:3000` again
6. Enter username: `User2` and room ID: `room1` (same room!)
7. Click "Join Room"

Now you can chat between the two tabs in real-time! 🎉

## 📁 Project Structure

```
co-watch/
├── backend-js/          # Node.js + Socket.IO backend
│   ├── index.js         # Main server file (CORS enabled)
│   ├── messageHandler.js
│   ├── userManager.js
│   └── package.json
│
└── cowatchfront/        # React + Vite frontend
    ├── src/
    │   ├── components/
    │   │   ├── JoinRoom.jsx    # Join room screen
    │   │   └── ChatRoom.jsx    # Chat interface
    │   ├── services/
    │   │   └── socketService.js # Socket.IO client
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 🔧 Troubleshooting

### Backend won't start
- Make sure port 5000 is not already in use
- Run `npm install` in the backend-js directory
- Check if all dependencies are installed

### Frontend won't start
- Make sure port 3000 is not already in use
- Run `npm install` in the cowatchfront directory
- Clear browser cache and try again

### Can't connect to backend
- Ensure the backend is running on port 5000
- Check browser console for errors (F12)
- Verify CORS is enabled in backend-js/index.js

### Messages not appearing
- Make sure both users are in the **same room ID**
- Check that the backend is running
- Open browser console (F12) to see connection status

## 🎨 Features

✅ Real-time chat with Socket.IO
✅ Beautiful glassmorphism UI
✅ Smooth animations and transitions
✅ Responsive design
✅ System notifications
✅ Auto-scroll to latest messages
✅ Keyboard shortcuts (Enter to send)

## 🔌 Socket.IO Events

### Frontend → Backend
- `joinRoom` - Join a chat room
  ```javascript
  { userName: "User1", roomId: "room1" }
  ```

- `sendChat` - Send a message
  ```javascript
  { roomId: "room1", msg: "Hello!" }
  ```

- `sendCtrl` - Send control message
  ```javascript
  { ctrlType: "play" }
  ```

### Backend → Frontend
- `message` - Receive chat message
- `system` - Receive system notification
- `ctrlMessage` - Receive control message

## 📝 Notes

- The backend runs on port **5000**
- The frontend runs on port **3000**
- CORS is configured to allow localhost:3000
- Messages are broadcast to all users in the same room
- System messages appear when users join

## 🎯 Next Steps

You can enhance the application by adding:
- User list showing active participants
- Message timestamps
- Private messaging
- File sharing
- Video player synchronization
- Emoji picker
- Message history

---

Enjoy your Co-Watch experience! 🎬💬
