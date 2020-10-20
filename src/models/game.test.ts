import Game from './game';

describe('Game model', () => {
  let game;
  const SOLUTION = 'zoovu';

  beforeEach(() => {
    game = new Game(SOLUTION);
  });

  it('is not solved just initialized', () => {
    expect(game.isSolved()).toBeFalsy();
  });

  it('have all the letter holders occupied at the begging', () => {
    expect(game.lettersHolder.every((letter) => !!letter)).toBeTruthy();
  });

  it('have all the solution holders empty at the begging', () => {
    expect(game.solutionHolder.every((letter) => !letter)).toBeTruthy();
  });

  it('is solved when the solution holder have the letter in the same order of the solution itself', () => {
    game.solutionHolder = SOLUTION.split('');
    expect(game.isSolved()).toBe(true);
  });

  it('starts with score at 0', () => {
    expect(game.score).toBe(0);
  });

  it('is able to increment the score by a number', () => {
    const number = Math.ceil(Math.random() * 10);
    game.incrementScore(number);
    expect(game.score).toBe(number);
  });

  // I should add a test for each move strategy but only going to add the next one as example
  it('swaps letters from letterHolder to solutionHolder', () => {
    const from = Math.floor(Math.random() * SOLUTION.length);
    const to = Math.floor(Math.random() * SOLUTION.length);
    const initialLetter = game.lettersHolder[from];
    const initialSolution = game.solutionHolder[to];
    game.makeMove({
      origin: {
        holder: 'letters',
        position: from
      },
      destiny: {
        holder: 'solution',
        position: to
      }
    });
    expect(game.lettersHolder[from]).toBe(initialSolution);
    expect(game.solutionHolder[to]).toBe(initialLetter);
  });
});
