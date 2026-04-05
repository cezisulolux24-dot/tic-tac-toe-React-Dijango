import { createContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(io("ws://localhost:8000/ws/game/room1/"));