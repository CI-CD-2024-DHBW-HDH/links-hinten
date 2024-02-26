import { getBlanks, invertPlayer, Field } from "../game";
import { randomMove, winningMove } from "./bot";

// the medium bot plays a wiining move, if it can
// or blocks the opponent from winning
// or plays the center field if it can
// otherwise it plays a random move
export function mediumMove(board: Field[], own: Field): number {
  return -1
}

// this bot just tries to block a win
// otherwise it plays a random move
export function pettyMove(board: Field[], own: Field): number {
  const otherPlayer = (own === Field.PLAYER1) ? Field.PLAYER2 : Field.PLAYER1;
  const opponentWinMove = winningMove(board, otherPlayer);

  const blankFields = getBlanks(board);
  if (blankFields.length === 0) {
    return -1;
  }

  if (opponentWinMove !== -1) {
    board[opponentWinMove] = own;
    return opponentWinMove;
  } else {
    let blankFields = getBlanks(board);
    let rndMove = randomMove(blankFields.length);
    board[rndMove] = own;
    return rndMove
  }
}
