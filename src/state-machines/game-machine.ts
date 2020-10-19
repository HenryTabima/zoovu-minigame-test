import { Machine, assign } from 'xstate';
import Player from '../models/player';
import Game, { IMoveContext } from '../models/game';

export interface GameContext {
  player: Player;
  game: Game;
}

export interface GameStateSchema {
  states: {
    initializingPlayer: {};
    standBy: {};
    playing: {};
    gameOver: {};
  };
}

export type GameEvent =
  | { type: 'SET_PLAYER_NAME'; name: string }
  | { type: 'MOVE_STARTED' }
  | { type: 'TICK' }
  | { type: 'MAKE_MOVE'; origin: IMoveContext; destiny: IMoveContext };

export default Machine<GameContext, GameStateSchema, GameEvent>(
  {
    id: 'zoovu-game',
    initial: 'initializingPlayer',
    states: {
      initializingPlayer: {
        on: {
          SET_PLAYER_NAME: {
            target: 'standBy',
            cond: (ctx, evt) => evt.name.trim() !== '',
            actions: [
              assign({ player: (ctx, evt) => new Player({ name: evt.name }) })
            ]
          }
        }
      },
      standBy: {
        entry: 'initGame',
        on: {
          MOVE_STARTED: 'playing'
        }
      },
      playing: {
        invoke: {
          src: 'clock'
        },
        on: {
          '': {
            target: 'gameOver',
            cond: (ctx) => ctx.game.isSolved()
          },
          MAKE_MOVE: {
            actions: (ctx, evt) => {
              ctx.game.makeMove({ origin: evt.origin, destiny: evt.destiny });
            }
          },
          TICK: {
            actions: (ctx) => ctx.game.incrementScore(1)
          }
        }
      },
      gameOver: {
        entry: (ctx) => ctx.player.addScore(ctx.game.score),
        after: {
          10000: 'standBy'
        }
      }
    }
  },
  {
    services: {
      clock: (ctx) => (cbSend) => {
        const timer = setInterval(() => {
          cbSend('TICK');
        }, 1000);
        return () => clearInterval(timer);
      }
    },
    actions: {
      initGame: assign({
        game: () => new Game('zoovu')
      })
    }
  }
);
