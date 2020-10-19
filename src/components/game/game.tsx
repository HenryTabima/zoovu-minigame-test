import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GameHeader from '../game-header/game-header';
import { useGameMachine } from '../../services/game-service';
import styled from '@emotion/styled';
import PickupCards from '../pickup-cards/pickup-cards';
import ZoovuLogoDroppableArea from '../zoovu-logo-droppable-area/zoovu-logo-droppable-area';

function Game() {
  const [state] = useGameMachine();
  return (
    <DndProvider backend={HTML5Backend}>
      <StyledGame>
        <GameHeader
          playerName={state.context.player.name}
          time={state.context.game.score}
        />
        <PickupCards />
        <ZoovuLogoDroppableArea />
      </StyledGame>
    </DndProvider>
  );
}

const StyledGame = styled.div`
  box-sizing: border-box;
  min-height: 100vh;
  background: linear-gradient(#fff 60%, rgba(59, 0, 120, 0.3));
  padding: 30px;
`;

export default Game;
