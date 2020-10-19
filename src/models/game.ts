import { shuffle } from '../utils';

export interface IMoveContext {
  holder: 'letters' | 'solution';
  position: number;
}

export default class Game {
  lettersHolder: string[];
  solutionHolder: string[];
  solution: string;
  score: number;

  private moveStrategies = {
    'letters-letters': ({ from, to }) =>
      ([this.lettersHolder[from], this.lettersHolder[to]] = [
        this.lettersHolder[to],
        this.lettersHolder[from]
      ]),
    'solution-solution': ({ from, to }) =>
      ([this.solutionHolder[from], this.solutionHolder[to]] = [
        this.solutionHolder[to],
        this.solutionHolder[from]
      ]),
    'letters-solution': ({ from, to }) =>
      ([this.solutionHolder[to], this.lettersHolder[from]] = [
        this.lettersHolder[from],
        this.solutionHolder[to]
      ]),
    'solution-letters': ({ from, to }) =>
      ([this.solutionHolder[from], this.lettersHolder[to]] = [
        this.lettersHolder[to],
        this.solutionHolder[from]
      ])
  };

  constructor(solution: string) {
    this.lettersHolder = shuffle(solution.split(''));
    this.solutionHolder = Array(solution.length).fill('');
    this.solution = solution;
    this.score = 0;
  }

  isSolved() {
    return this.solution === this.solutionHolder.join('');
  }

  isPositionRight(position: number) {
    return (
      this.solutionHolder[position] === this.solution[position] &&
      this.solutionHolder[position] !== ''
    );
  }

  incrementScore(amount: number) {
    this.score = this.score + amount;
  }

  makeMove({ origin, destiny }) {
    this.checkMoveParams({ from: origin.position, to: destiny.position });
    const strategy = `${origin.holder}-${destiny.holder}`;
    const move = this.moveStrategies[strategy];
    move({ from: origin.position, to: destiny.position });
    if (
      destiny.holder === 'solution' &&
      !this.isPositionRight(destiny.position)
    ) {
      this.incrementScore(10);
    }
  }

  private checkMoveParams({ from, to }) {
    if (
      from < 0 ||
      from >= this.solution.length ||
      to < 0 ||
      to >= this.solution.length
    ) {
      throw new Error('You are trying to move an Item out of the range');
    }
  }
}
