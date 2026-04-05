// src/socket.ts
let socket: WebSocket | null = null;

export const getSocket = (roomName: string): WebSocket => {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket(`ws://127.0.0.1:8000/ws/game/${roomName}/`);

    socket.onopen = () => console.log(`✅ Connected to room: ${roomName}`);
    socket.onerror = (err) => console.error("❌ WebSocket error:", err);
    socket.onclose = () => console.log("WebSocket closed");
  }
  return socket;
};