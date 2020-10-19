import React from 'react';
import styled from '@emotion/styled';
import { useGameMachine } from '../../services/game-service';
import useCountDown from '../../services/countdown-service';
function GameOver() {
  const [state] = useGameMachine();
  const count = useCountDown(10);
  return (
    <StyledGameOver>
      <div className="info">
        <h3 className="result">
          You have won in {state.context.game?.score} seconds!
        </h3>
        {!!state.context.player?.highScore && (
          <div className="high-score">
            Best time: {state.context.player.highScore} seconds
          </div>
        )}
        <div className="countdown">
          The game will restart in {count} seconds.
        </div>
      </div>
    </StyledGameOver>
  );
}

const StyledGameOver = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  .info {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    width: 500px;
    max-width: 90%;
    text-align: center;
    .high-score {
      font-size: 0.9rem;
      color: gray;
    }
    .countdown {
      margin-bottom 20px;
    }
  }
`;

export default GameOver;
