import React from 'react';
import styled from '@emotion/styled';
import DroppableSection from '../droppable-section/droppable-section';
import { useGameMachine } from '../../services/game-service';

function PickupCards() {
  const [state] = useGameMachine();
  return (
    <StyledPickupCards>
      <div className="header">
        <div>Pickup the right cards</div>
        <div>The faster the better!</div>
      </div>
      <DroppableSection
        context="letters"
        letters={state.context.game.lettersHolder}
      />
    </StyledPickupCards>
  );
}

const StyledPickupCards = styled.div`
  margin-bottom: 70px;
  .header {
    font-size: 0.9rem;
    margin-bottom: 40px;
    color: gray;
    display: flex;
    justify-content: space-between;
  }
`;

export default PickupCards;
