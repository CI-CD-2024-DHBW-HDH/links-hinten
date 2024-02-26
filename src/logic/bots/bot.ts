import { Field, Mode, won } from "../game";
import { easyMove } from "./easy";
import { hardMove } from "./hard";
import { mediumMove, pettyMove } from "./medium";

export type BotMove = (board: Field[], own: Field) => number;

export function moveWithMode(mode: Mode): BotMove | undefined {
  switch (mode) {
    case Mode.EASY:
      return easyMove;
    case Mode.PETTY:
      return pettyMove;
    case Mode.MEDIUM:
      return mediumMove;
    case Mode.HARD:
      return hardMove;
    case Mode.HUMAN:
    case Mode.ONLINE:
      return undefined;
    default:
      return undefined;
  }
}

// winningMove returns a move player can play to win
// if there is no winning move, it returns -1
export function winningMove(board: Field[], own: Field): number {
  // Check if there's a winning move available for the bot
  for (let i = 0; i < board.length; i++) {
    if (board[i] === Field.EMPTY) {
      // If the current position is empty, simulate placing the bot's own marker
      board[i] = own;
      // Check if this move results in a win for the bot
      if (won(board) === own) {
        // If it's a winning move, return the index of this position
        return i;
      }
      // If it's not a winning move, revert the board to its original state
      board[i] = Field.EMPTY;
    }
  }

  // If there's no winning move, return -1
  return -1;
}

export function randomMove(bounds: number): number {
  return Math.floor(Math.random() * bounds);
}
