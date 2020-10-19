import React from 'react';
import styled from '@emotion/styled';
import DroppableSection from '../droppable-section/droppable-section';
import { useGameMachine } from '../../services/game-service';

function ZoovuLogoDroppableArea() {
  const [state] = useGameMachine();
  return (
    <StyledZoovuLogoDroppableArea>
      <div className="header">
        <div>
          ... and drop them here to make the logo great <span>again!</span>
        </div>
      </div>
      <DroppableSection
        context="solution"
        letters={state.context.game.solutionHolder}
      />
    </StyledZoovuLogoDroppableArea>
  );
}

const StyledZoovuLogoDroppableArea = styled.div`
  .header {
    font-size: 0.9rem;
    margin-bottom: 40px;
    color: gray;
    display: flex;
    justify-content: space-between;
    span {
      color: silver;
    }
  }
`;

export default ZoovuLogoDroppableArea;
