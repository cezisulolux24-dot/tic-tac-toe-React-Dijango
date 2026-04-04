import React, { useEffect, useState } from "react";
import { socket } from "../socket";
import type { User, Player, Room, BOARD_TYPE, TURN_TYPE, WINNER_TYPE } from "../types";
import { align, btns, containerGame, context, des, leaveBtn, restartBtn, result, square, title } from "./GameStyle";

interface GameProps {
  user: User;
  roomId: string;
  onLeave: () => void;
}

const Game: React.FC<GameProps> = (props) => {
  const {
    user,
    roomId,
    onLeave,
  } = props;

  const [board, setBoard] = useState<BOARD_TYPE[]>(Array(9).fill(null));
  const [players, setPlayers] = useState<Player[]>([]);
  const [mySymbol, setMySymbol] = useState<BOARD_TYPE>(null);
  const [turn, setTurn] = useState<TURN_TYPE>("X");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<WINNER_TYPE>(null);

  // const gameOver = () => {
  //   setGameOver(true);
  // }

  // const checkLine = (board: (null | "X" | "O")[]): boolean => {
  //   const first = board[0];

  //   for (let i = 1; i < line[0].length; i++) {
  //     const value = line[i];
  //     if (value != first)
  //       return false;
  //   }

  //   return true;
  // }

  const checkWinner = (board: (null | "X" | "O")[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of lines)
      // if (checkLine(board))
      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) return board[a];

    return null;
  };

  const joinRoom = () => {
    if (!socket.connected) socket.connect();

    socket.emit("joinRoom", {
      roomId,
      userId: user.id,
      username: user.username
    });

    socket.on("connect", joinRoom);
    socket.on("updateRoom", (room: Room) => {
      setPlayers(room.players);
      setBoard(room.board);
      setTurn(room.turn);
      const me: Player = room.players.find((p: Player) => p.userId === user.id);
      setMySymbol(me ? me.symbol : null);
    });
  };
  const willUpdateRoom = () => {
    socket.off("connect", joinRoom);
    socket.off("updateRoom");
  }
  const handleMove = ({ index, symbol, turn }) => {
    setBoard(prev => {
      const b = [...prev];
      b[index] = symbol;
      const win = checkWinner(b);
      if (win) {
        // gameOver();
        setGameOver(true);
        setWinner(win);
        if (mySymbol === win) {
          socket.emit("gameResult", {
            roomId,
            playerX: players.find(p => p.symbol === "X")?.userId,
            playerO: players.find(p => p.symbol === "O")?.userId,
            winner: win
          });
        }
      } else if (!b.includes(null)) {
        setGameOver(true);
        setWinner("Draw");
        socket.emit("gameResult", {
          roomId,
          playerX: players.find(p => p.symbol === "X")?.userId,
          playerO: players.find(p => p.symbol === "O")?.userId,
          winner: null
        });
      }
      return b;
    });
    setTurn(turn);
  };
  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setGameOver(false);
    setWinner(null);
  };
  const handleClick = (i: number) => {
    if (board[i] || gameOver || mySymbol !== turn) return;
    socket.emit("move", { roomId, index: i, userId: user.id });
  };
  const restartGame = () => { socket.emit("restartGame", { roomId }); };
  const leaveRoom = () => {
    socket.emit("leaveRoom", { roomId, userId: user.id });
    localStorage.removeItem("roomId");
    onLeave();
  };

  useEffect(() => {
    joinRoom();
    return () => {
      willUpdateRoom()
    };
  }, [roomId, user.id]);

  useEffect(() => {

    socket.on("move", handleMove); // socketMove();
    socket.on("restartGame", handleRestart);

    return () => {
      socket.off("move", handleMove);
      socket.off("restartGame", handleRestart);
    };
  }, [players, mySymbol]);



  return (
    <div style={containerGame}>
      <div style={context}>
        <h2 style={title}>Room: {roomId}</h2>
        <h3 style={des}>You are {mySymbol} | Turn: {turn}</h3>

        <div style={align}>
          {board.map((cell, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              disabled={cell !== null || gameOver || mySymbol !== turn}
              style={square}
            >
              {cell}
            </button>
          ))}
        </div>

        {gameOver ? (
          <h3 style={result}>
            {winner === "Draw" ? "Draw" : winner === mySymbol ? "You Win 🎉" : "You Lose 😢"}
          </h3>
        ) : null}

        <div style={btns}>
          <button
            onClick={restartGame}
            style={restartBtn}
          >
            Restart Game
          </button>

          <button
            onClick={leaveRoom}
            style={leaveBtn}
          >
            Leave Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;