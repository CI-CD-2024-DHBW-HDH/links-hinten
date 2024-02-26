import { getBlanks, Field } from "../game";
import { randomMove, winningMove } from "./bot";

// the medium bot plays a wiining move, if it can
// or blocks the opponent from winning
// or plays the center field if it can
// otherwise it plays a random move
export function mediumMove(board: Field[], own: Field): number {
  const otherPlayer = own === Field.PLAYER1 ? Field.PLAYER2 : Field.PLAYER1;
  const opponentWinMove = winningMove(board, otherPlayer);
  const ownWinMove = winningMove(board, own);

  const blankFields = getBlanks(board);
  if (blankFields.length === 0) {
    return -1;
  }

  if (ownWinMove !== -1) {
    board[ownWinMove] = own;
    return ownWinMove;
  } else if (opponentWinMove !== -1) {
    board[opponentWinMove] = own;
    return opponentWinMove;
  } else if (board[4] === Field.EMPTY) {
    board[4] = own;
    return 4;
  } else {
    const blankFields = getBlanks(board);
    let rndMove = randomMove(blankFields.length);

    while (board[rndMove] !== Field.EMPTY) {
      rndMove = randomMove(blankFields.length);
    }

    board[rndMove] = own;
    return rndMove;
  }
}

// this bot just tries to block a win
// otherwise it plays a random move
export function pettyMove(board: Field[], own: Field): number {
  const otherPlayer = own === Field.PLAYER1 ? Field.PLAYER2 : Field.PLAYER1;
  const opponentWinMove = winningMove(board, otherPlayer);

  const blankFields = getBlanks(board);
  if (blankFields.length === 0) {
    return -1;
  }

  if (opponentWinMove !== -1) {
    board[opponentWinMove] = own;
    return opponentWinMove;
  } else {
    const blankFields = getBlanks(board);
    let rndMove = randomMove(blankFields.length);
    while (board[rndMove] !== Field.EMPTY) {
      rndMove = randomMove(blankFields.length);
    }
    board[rndMove] = own;
    return rndMove;
  }
}
