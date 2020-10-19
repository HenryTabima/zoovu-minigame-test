import React, { ReactChild } from 'react';
import { useDrop } from 'react-dnd';
import styled from '@emotion/styled';

interface DrapeableAreaProps {
  children: ReactChild;
  onDrop: (item) => void;
  canDrop: boolean;
}

function DroppableArea({ children, onDrop, canDrop }: DrapeableAreaProps) {
  const [, drop] = useDrop({
    accept: 'card',
    drop: (item) => {
      onDrop(item);
    },
    canDrop: () => canDrop
  });
  return (
    <StyledDroppableArea ref={drop} hasChildren={!!children}>
      {children}
    </StyledDroppableArea>
  );
}

interface StyledDroppableAreaProps {
  hasChildren: boolean;
}

const StyledDroppableArea = styled.div<StyledDroppableAreaProps>`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  padding-top: 100%;
  border: ${(porps) => (porps.hasChildren ? 'none' : '3px dashed teal')};
  border-radius: 10%;
  background-color: #faf9fa;
`;

export default DroppableArea;
