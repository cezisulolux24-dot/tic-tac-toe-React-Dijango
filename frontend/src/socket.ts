// src/socket.ts
import { io } from 'socket.io-client';
import { BASE_URL } from "./config/config";

export const socket = io(BASE_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// const joinRoom = ({
//   roomId,
//   userId
//     username
// }) => {
//   if (!socket.connected) socket.connect();

//   socket.emit("joinRoom", {
//     roomId,
//     userId: user.id,
//     username: user.username
//   });
// };