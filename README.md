# Dobby – Real-Time Collaborative IDE

*Live Application:* [https://dobby-new.vercel.app/](https://dobby-new.vercel.app/)  
*Project Documentation:* [Google Docs Link](https://docs.google.com/document/d/1i0gqZf_wMQr0m5AZWRu0wSYdHcsG_OsXKVjlNJwv6mo/edit?tab=t.0#heading=h.x0am6lnit9xt)

---

## Overview

*Dobby* is a real-time collaborative coding environment that enables multiple users to join a shared room, write and edit code simultaneously, chat, and even collaborate via video conferencing. The platform is designed to replicate the experience of a shared online IDE while maintaining low latency and seamless synchronization between users.

It serves as a robust demonstration of how WebSockets, peer-to-peer connections, and frontend state management can be combined to create an interactive, distributed system for developers.

---

## How It Works

The project is divided into two main modules:

### 1. Frontend (/client)
- Built using *React.js* with *Chakra UI* for a clean and responsive interface.
- Uses *React Router DOM* for navigation between routes such as:
  - / – Landing page  
  - /join-room – Join an existing collaboration session  
  - /room/:roomId – Real-time collaborative IDE  
  - /room/getit/:roomId – Video conferencing and shared view
- *Socket.io-client* manages real-time communication with the backend.
- Includes conditional rendering for mobile users with a restricted access page.
- Handles live updates for code, language changes, messages, and user joins/leaves.
- Frontend is deployed on *Vercel* for optimal performance and scalability.

### 2. Backend (server.js)
- Built with *Node.js, **Express, and **Socket.io* for handling bidirectional communication.
- The server:
  - Manages room creation and user mapping.
  - Synchronizes code changes, programming language selection, and chat messages.
  - Handles video conferencing through WebRTC-based signaling events.
  - Broadcasts real-time updates for user joins, disconnects, and shared canvas changes.
- Uses *UUID* for uniquely identifying messages and rooms.
- Configured with *CORS* to allow secure cross-origin communication with the frontend.

### 3. Real-Time Collaboration Flow
1. A user creates or joins a room via a unique room ID.
2. The server maintains user-to-room mappings and broadcasts new participant information.
3. Each client listens for updates such as:
   - Code edits
   - Language changes
   - Chat messages
   - Canvas image updates
4. WebRTC handles peer-to-peer video/audio connection between users.
5. When a user leaves, the system updates all connected clients and cleans up memory.

---

## Features

- *Live Code Synchronization:* Real-time updates between all connected users.
- *Integrated Video Conferencing:* Peer-to-peer video and audio collaboration.
- *Multi-User Chat:* Instant message broadcasting using Socket.io.
- *Code Language Sync:* Consistent programming environment across all participants.
- *Canvas Sharing:* Real-time whiteboard/canvas collaboration.
- *Room Management:* Join or create unique rooms via room IDs.
- *Cross-Browser Compatibility:* Fully functional on desktop browsers.
- *Mobile Restriction Handling:* Prevents unsupported devices from accessing room sessions.

---

## Tech Stack

| Layer | Technologies Used |
|-------|--------------------|
| *Frontend* | React.js, Chakra UI, React Router DOM, Socket.io-client, react-device-detect |
| *Backend* | Node.js, Express.js, Socket.io, UUID |
| *Deployment* | Vercel (Frontend), Render / Railway / Localhost (Backend) |
| *Real-Time Communication* | WebSockets (Socket.io) + WebRTC |

---

## Local Development Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Steps

1. *Clone the Repository*
   bash
   git clone https://github.com/Prayas248/Dobby_New.git
   cd Dobby_New

2. **Install Dependencies**
   bash
   # for backend
   cd server
   npm install
   
   # For client
   cd client
   npm install

3. *Run the app*
   bash
   cd server
   node server.js

   #For client
   cd client
   npm start
   
3. **Access the app**
   bash
   Client:  http://localhost:3000
   Backend:  http://localhost:5000

### Docker Setup
 ```bash
   docker build -t dobby-new .
   docker run -p 5000:5000 dobby-new
