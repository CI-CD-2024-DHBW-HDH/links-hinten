import { Field, Mode } from '../game'
import { moveWithMode, winningMove, randomMove } from './bot'

describe('Bot functions', () => {
  describe('moveWithMode', () => {
    it('should return the correct move function based on the mode', () => {
      expect(moveWithMode(Mode.EASY)).toBeInstanceOf(Function)
      expect(moveWithMode(Mode.PETTY)).toBeInstanceOf(Function)
      expect(moveWithMode(Mode.MEDIUM)).toBeInstanceOf(Function)
      expect(moveWithMode(Mode.HARD)).toBeInstanceOf(Function)
      expect(moveWithMode(Mode.HUMAN)).toBeUndefined()
      expect(moveWithMode(Mode.ONLINE)).toBeUndefined()
    })
  })

  describe('winningMove', () => {
    it('should return the winning move if available', () => {
      const board = [
        Field.EMPTY,
        Field.EMPTY,
        Field.EMPTY,
        Field.EMPTY,
        Field.EMPTY,
        Field.EMPTY,
        Field.EMPTY,
        Field.EMPTY,
        Field.EMPTY
      ]
      board[0] = Field.PLAYER1
      board[1] = Field.PLAYER1
      expect(winningMove(board, Field.PLAYER1)).toBe(2)
    })

    it('should return -1 if no winning move is available', () => {
      const board = [
        Field.EMPTY,
        Field.EMPTY,
        Field.EMPTY,
        Field.EMPTY,
        Field.EMPTY,
        Field.EMPTY,
        Field.EMPTY,
        Field.EMPTY,
        Field.EMPTY
      ]
      expect(winningMove(board, Field.PLAYER1)).toBe(-1)
    })
  })

  describe('randomMove', () => {
    it('should return a random number within the bounds', () => {
      const bounds = 10
      const move = randomMove(bounds)
      expect(move).toBeGreaterThanOrEqual(0)
      expect(move).toBeLessThan(bounds)
    })
  })
})
