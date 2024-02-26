import {
  Field,
  invertPlayer,
  Game,
  Player,
  Mode,
  Outcome,
  isFull,
  won,
  getBlanks,
  isPlayer,
} from "./game";

describe("invert player", () => {
  it("invert player1 to player2", () => {
    const result: Field = invertPlayer(Field.PLAYER1);
    expect(result).toBe(Field.PLAYER2);
  });
  it("invert player2 to player1", () => {
    const result: Field = invertPlayer(Field.PLAYER2);
    expect(result).toBe(Field.PLAYER1);
  });
  it("return empty field as empty", () => {
    const result: Field = invertPlayer(Field.EMPTY);
    expect(result).toBe(Field.EMPTY);
  });
});

describe("Game addWin", () => {
  it("addWin player1", () => {
    const game = new Game();
    game.addWin(Field.PLAYER1);
    expect(game.player.score).toBe(1);
  });
  it("addWin player2", () => {
    const game = new Game();
    game.addWin(Field.PLAYER2);
    expect(game.enemy.score).toBe(1);
  });
});

describe("switchSides swaps player and enemy data", () => {
  it("swaps player and enemy data", () => {
    const game = new Game(new Player(Field.PLAYER2), new Player(Field.PLAYER1));
    const playerMove = game.player.botMove;
    const enemyMove = game.enemy.botMove;
    const playerScore = game.player.score;
    const enemyScore = game.enemy.score;

    game.switchSides();

    expect(game.player.botMove).toBe(enemyMove);
    expect(game.enemy.botMove).toBe(playerMove);
    expect(game.player.score).toBe(enemyScore);
    expect(game.enemy.score).toBe(playerScore);
  });
});

describe("Game updateMode", () => {
  it("sets mode for two humans to humanmode", () => {
    const game = new Game(
      new Player(Field.PLAYER1),
      new Player(Field.PLAYER2),
      Mode.EASY,
    );
    game.updateMode(Mode.HUMAN);
    expect(game.mode).toBe(Mode.HUMAN);
  });
  it("sets mode for two bots to botmode", () => {
    const game = new Game(
      new Player(Field.PLAYER1),
      new Player(Field.PLAYER2),
      Mode.HUMAN,
    );
    game.updateMode(Mode.EASY);
    expect(game.mode).toBe(Mode.EASY);
  });
});

describe("Outcome isdraw", () => {
  it("returns true if the game is a draw", () => {
    const game = new Game();
    const outcome = new Outcome([
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.PLAYER2,
    ]);
    expect(outcome.isDraw()).toBe(true);
  });
  it("returns false if the game is not a draw", () => {
    const game = new Game();
    const outcome = new Outcome([
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.EMPTY,
    ]);
    expect(outcome.isDraw()).toBe(false);
  });
});

describe("Board isFull", () => {
  it("returns true if the board is full", () => {
    const game = new Game();
    const result = isFull([
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.PLAYER2,
    ]);
    expect(result).toBe(true);
  });
  it("returns false if the board is not full", () => {
    const game = new Game();
    const result = isFull([
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.EMPTY,
    ]);
    expect(result).toBe(false);
  });
});

describe("Board won", () => {
  it("returns player1 if player1 has won", () => {
    const game = new Game();
    const result = won([
      Field.PLAYER1,
      Field.PLAYER1,
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER2,
      Field.EMPTY,
      Field.EMPTY,
      Field.EMPTY,
      Field.EMPTY,
    ]);
    expect(result).toBe(Field.PLAYER1);
  });
  it("returns player2 if player2 has won", () => {
    const game = new Game();
    const result = won([
      Field.PLAYER2,
      Field.PLAYER2,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.PLAYER1,
      Field.EMPTY,
      Field.EMPTY,
      Field.EMPTY,
      Field.EMPTY,
    ]);
    expect(result).toBe(Field.PLAYER2);
  });
  it("returns empty if no player has won", () => {
    const game = new Game();
    const result = won([
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.EMPTY,
    ]);
    expect(result).toBe(Field.EMPTY);
  });
});

describe("Board getBlanks", () => {
  it("returns an array of empty fields", () => {
    const game = new Game();
    const result = getBlanks([
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.EMPTY,
    ]);
    expect(result).toEqual([8]);
  });
  it("returns an empty array if there are no empty fields", () => {
    const game = new Game();
    const result = getBlanks([
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.PLAYER2,
      Field.PLAYER2,
      Field.PLAYER1,
      Field.PLAYER1,
    ]);
    expect(result).toEqual([]);
  });
});

describe("Player isHuman", () => {
  it("returns true if the player is human", () => {
    const player = new Player(Field.PLAYER1);
    expect(player.isHuman()).toBe(true);
  });
  it("returns false if the player is not human", () => {
    const player = new Player(Field.PLAYER1);
    player.botMove = () => 0;
    expect(player.isHuman()).toBe(false);
  });
});
