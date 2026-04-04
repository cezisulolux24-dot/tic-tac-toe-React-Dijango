// src/App.tsx
import React, { useEffect, useState } from "react";
import Auth from "./components/pages/Auth";
import RoomList from "./components/pages/RoomList";
import Game from "./components/pages/Game";
import type { User } from "./types";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);

  // ✅ Restore state after refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedRoom = localStorage.getItem("roomId");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedRoom) setRoomId(savedRoom);
  }, []);

  const handleLogin = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const handleJoin = (roomId: string) => {
    localStorage.setItem("roomId", roomId);
    setRoomId(roomId);
  };

  const leaveRoom = () => {
    localStorage.removeItem("roomId");
    setRoomId(null);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setRoomId(null);
  };

  if (!user) return <Auth onLogin={handleLogin} />;
  if (!roomId) return <RoomList onJoin={handleJoin} onLogout={logout} />;

  return <Game user={user} roomId={roomId} onLeave={leaveRoom} />;
};

export default App;