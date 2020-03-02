import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from './item-types';
import { ICardProps, Item } from './models';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

const Card: React.FC<ICardProps> = ({
  card,
  moveCard,
  findCard,
  ContainerId,
  removeCard,
}) => {
  const originalIndex = findCard(card.id).index;
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.CARD,
      originalIndex,
      card,
      ContainerId,
      removeCard,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { card: originalCard, originalIndex } = monitor.getItem();

      const didDrop = monitor.didDrop();

      if (!didDrop) {
        moveCard(originalCard, originalIndex);
      }
    },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    canDrop: () => false,
    hover({
      card: draggedCard,
      ContainerId: draggedConatinerId,
      removeCard: removeCardOrigin,
    }: Item) {
      if (draggedCard.id !== card.id) {
        const { index: overIndex, ContainerId: overContainerID } = findCard(
          card.id
        );
        moveCard(draggedCard, overIndex);
        /// console.log(draggedConatinerId, overContainerID);
        if (draggedConatinerId !== overContainerID) {
          removeCardOrigin(draggedCard.id);
        }
      }
    },
  });

  const opacity = isDragging ? 0 : 1;
  return (
    <div ref={node => drag(drop(node))} style={{ ...style, opacity }}>
      {card.text}
    </div>
  );
};

export default Card;
