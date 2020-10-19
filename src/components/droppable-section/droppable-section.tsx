import React from 'react';
import { useGameMachine } from '../../services/game-service';
import DraggableCard from '../draggable-card/draggable-card';
import DroppableArea from '../droppable-area/droppable-area';
import styled from '@emotion/styled';

interface DroppableSectionProps {
  context: 'letters' | 'solution';
  letters: string[];
}

function DroppableSection({ context, letters }: DroppableSectionProps) {
  const [, send] = useGameMachine();
  return (
    <StyledDropppableSection itemsCount={letters.length}>
      {letters.map((letter, position) => (
        <DroppableArea
          key={`${context}-${position}`}
          onDrop={(card) => {
            send('MAKE_MOVE', {
              origin: { holder: card.holder, position: card.position },
              destiny: { holder: context, position }
            });
          }}
          canDrop={!letter}
        >
          {!!letter && (
            <DraggableCard
              letter={letter}
              position={position}
              holder={context}
              onDrag={() => {
                send('MOVE_STARTED');
              }}
            />
          )}
        </DroppableArea>
      ))}
    </StyledDropppableSection>
  );
}

interface StyledDropppableSectionProps {
  itemsCount: number;
}

const StyledDropppableSection = styled.div<StyledDropppableSectionProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.itemsCount}, 1fr);
  grid-gap: 30px;
`;
export default DroppableSection;
