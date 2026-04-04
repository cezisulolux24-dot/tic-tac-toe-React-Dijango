// src/types.ts
export type TURN_TYPE = "X" | "O";
export type BOARD_TYPE = TURN_TYPE | null;
export type WINNER_TYPE = BOARD_TYPE | "Draw";

export interface User {
  id: number;
  username: string;
}

export interface Player {
  userId: number;
  username: string;
  symbol: "X" | "O";
}

export interface MoveEvent {
  index: number;
  symbol: "X" | "O";
}

export interface Room {
  id: string,
  players: Player[],
  spectators: [],
  board: BOARD_TYPE[],
  turn: TURN_TYPE,
  gameOver: boolean,
  winner: WINNER_TYPE
}

