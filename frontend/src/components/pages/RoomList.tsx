// src/pages/RoomList.tsx
import React, { useEffect, useState } from "react";
import { getRooms } from "../../api/roomAPI";
import type { Room } from "../../types";
import './RoomList.css';

interface Props {
  onJoin: (roomId: string) => void;
  onLogout: () => void
}

const RoomList: React.FC<Props> = ({ onJoin }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomId, setRoomId] = useState<string>("");

  const fetchRooms = async () => {
    const rooms = await getRooms()
    setRooms(rooms);
  };

  useEffect(() => {
    fetchRooms();
    const interval = setInterval(fetchRooms, 2000);
    return () => clearInterval(interval);
  }, []);

  const joinRoom = (id: string) => {
    onJoin(id);
  };

  return (
    <div className={'containerRoom'}>
      <div className={'contentRoom'}>
        <div>
          <h2 className={'titleRoom'}>Rooms</h2>
          {/* <button className={'{ width: '65px', justifySelf: 'right' }}>Log out</button> */}
        </div>

        <ul className={'ulRoom'}>
          {rooms.map(room => (
            <li key={room.id} className={'liRoom'}>
              <span>{room.id} ({room.players.length}/2)</span>
              <button
                onClick={() => joinRoom(room.id)}
                className={'joinBtn'}
              >
                Join
              </button>
            </li>
          ))}
        </ul>

        <h3 className={'titleRoom'}>Create Room</h3>
        <div className={'createRoom'}>
          <input
            value={roomId}
            onChange={e => setRoomId(e.target.value)}
            placeholder="Room ID"
            className={'newRoomId'}
          />
          <button
            onClick={() => joinRoom(roomId)}
            className={'createBtn'}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomList;