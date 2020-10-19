import React from 'react';
import { useDrag } from 'react-dnd';
import styled from '@emotion/styled';

interface DraggableCardProps {
  letter: string;
  position: number;
  holder: 'letters' | 'solution';
  onDrag: () => void;
}

function DraggableCard({
  letter,
  position,
  holder,
  onDrag
}: DraggableCardProps) {
  const [{ opacity }, drag] = useDrag({
    item: { type: 'card', letter, position, holder },
    begin: () => {
      onDrag();
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.3 : 1
    })
  });
  return (
    <StyledDraggableCard opacity={opacity} ref={drag}>
      <img src={`zoovu-${letter}.svg`} />
    </StyledDraggableCard>
  );
}

interface StyledDraggableCardProps {
  opacity: number;
}

const StyledDraggableCard = styled.div<StyledDraggableCardProps>`
  position: absolute;
  cursor: move;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10%;
  opacity: ${(props) => props.opacity};
  box-shadow: 0px 5px 20px -11px rgba(0, 0, 0, 0.75);
  img {
    width: 50%;
  }
`;

export default DraggableCard;
