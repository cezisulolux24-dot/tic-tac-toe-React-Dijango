// src/pages/RoomList.tsx
import React, { useEffect, useState } from "react";
import { getRooms } from "../api/roomAPI";
import type { Room } from "../types";
import { containerRoom, contentRoom, createBtn, createRoom, joinBtn, liRoom, newRoomId, titleRoom, ulRoom } from "./RoomStyle";

interface Props {
  onJoin: (roomId: string) => void;
}

const RoomList: React.FC<Props> = ({ onJoin }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomId, setRoomId] = useState<string>("");

  const fetchRooms = async () => {
    const rooms = await getRooms()
    setRooms(rooms);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRooms();
    const interval = setInterval(fetchRooms, 2000);
    return () => clearInterval(interval);
  }, []);

  const joinRoom = (id: string) => {
    onJoin(id);
  };

  return (
    <div style={containerRoom}>
      <div style={contentRoom}>
        <div>
          <h2 style={titleRoom}>Rooms</h2>
          {/* <button style={{ width: '65px', justifySelf: 'right' }}>Log out</button> */}
        </div>

        <ul style={ulRoom}>
          {rooms.map(room => (
            <li key={room.id} style={liRoom}>
              <span>{room.id} ({room.players.length}/2)</span>
              <button
                onClick={() => joinRoom(room.id)}
                style={joinBtn}
              >
                Join
              </button>
            </li>
          ))}
        </ul>

        <h3 style={titleRoom}>Create Room</h3>
        <div style={createRoom}>
          <input
            value={roomId}
            onChange={e => setRoomId(e.target.value)}
            placeholder="Room ID"
            style={newRoomId}
          />
          <button
            onClick={() => joinRoom(roomId)}
            style={createBtn}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomList;