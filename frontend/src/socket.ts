// src/socket.ts
import { io } from "socket.io-client";

export const socket = io("http://192.168.137.27:3000", {
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