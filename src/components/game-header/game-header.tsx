import React from 'react';
import styled from '@emotion/styled';

interface GameHeaderProps {
  playerName: string;
  time: number;
}

function GameHeader({ playerName, time }: GameHeaderProps) {
  return (
    <StyledGameHeader>
      <div className="greetings">Good luck, {playerName}!</div>
      <div className="score">
        <span>⏲</span> Your score: {time} seconds
      </div>
    </StyledGameHeader>
  );
}

const StyledGameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  .greetings {
    font-weight: bold;
    font-size: 1.4rem;
  }
  .score {
    color: #3b0078;
  }
  margin-bottom: 20px;
`;

export default GameHeader;
