// src/components/Board.tsx
import { useEffect, useState } from "react";
import { getSocket } from "../socket";

type Player = "X" | "O" | null;

export default function Board() {
  const [cells, setCells] = useState<Player[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | "Draw" | null>(null);
  const [playerSymbol, setPlayerSymbol] = useState<Player>(null); // X or O for this client

  const roomName = "ghost"; // same as backend room

  useEffect(() => {
    const socket = getSocket(roomName);

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setCells(data.cells);
      setTurn(data.turn);
      setWinner(data.winner || null);
      if (!playerSymbol) {
        // Assign player symbol to first two users
        const movesMade = data.cells.filter(Boolean).length;
        setPlayerSymbol(movesMade % 2 === 0 ? "X" : "O");
      }
    };
  }, []);

  const checkWinner = (board: Player[]): Player | "Draw" | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    if (board.every(Boolean)) return "Draw";
    return null;
  };

  const handleClick = (idx: number) => {
    if (cells[idx] || winner || playerSymbol !== turn) return; // prevent invalid clicks

    const newCells = [...cells];
    newCells[idx] = playerSymbol;
    const newWinner = checkWinner(newCells);
    const nextTurn: Player = playerSymbol === "X" ? "O" : "X";

    setCells(newCells);
    setTurn(nextTurn);
    setWinner(newWinner);

    // send update to server
    const socket = getSocket(roomName);
    socket.send(JSON.stringify({ cells: newCells, turn: nextTurn, winner: newWinner }));
  };

  const resetBoard = () => {
    const newCells = Array(9).fill(null);
    setCells(newCells);
    setTurn("X");
    setWinner(null);

    const socket = getSocket(roomName);
    socket.send(JSON.stringify({ cells: newCells, turn: "X", winner: null }));
  };

  return (
    <div>
      <h2>
        {winner
          ? winner === "Draw"
            ? "Draw!"
            : `Winner: ${winner}`
          : `Your symbol: ${playerSymbol || "..."}, Turn: ${turn}`}
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)" }}>
        {cells.map((cell, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(idx)}
            style={{
              border: "1px solid black",
              width: 100,
              height: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 32,
              cursor: "pointer",
            }}
          >
            {cell}
          </div>
        ))}
      </div>
      <button onClick={resetBoard} style={{ marginTop: 20, padding: "10px 20px" }}>
        Reset Board
      </button>
    </div>
  );
}