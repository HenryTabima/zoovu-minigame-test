interface IPlayerConstructorParams {
  name: string;
  highScoreRule?: (newScore: number, highScore: number) => boolean;
}

class Player {
  name: string;
  highScore: number;
  scores: number[];
  highScoreRule: (newScore: number, highScore: number) => boolean;
  constructor({
    name,
    highScoreRule = (newScore, highScore) => newScore < highScore
  }: IPlayerConstructorParams) {
    this.name = name;
    this.highScore = undefined;
    this.scores = [];
    this.highScoreRule = highScoreRule;
  }

  addScore(score: number) {
    this.scores.push(score);
    this.highScore =
      !this.highScore || this.highScoreRule(score, this.highScore)
        ? score
        : this.highScore;
  }
}

export default Player;
