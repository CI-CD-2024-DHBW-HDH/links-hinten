import { Field } from "../game";
import { winningMove } from "./bot";

// the easy bot plays a winning move, if it can
// otherwise, it plays a random move
export function easyMove(board: Field[], own: Field): number {
  //TODO: Check for winning move
  const emptyPositions: number[] = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === Field.EMPTY) {
            emptyPositions.push(i);
        }
    }
    const randomIndex = Math.floor(Math.random() * emptyPositions.length);
    return emptyPositions[randomIndex];
}
