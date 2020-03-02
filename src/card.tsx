import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from './item-types';
import { ICard } from './models';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

export interface CardProps {
  id: number;
  text: string;
  moveCard: (card: ICard, to: number) => void;
  findCard: (id: number) => { index: number };
}

interface Item {
  type: string;
  id: number;
  originalIndex: string;
  text: string;
}

const Card: React.FC<CardProps> = ({ id, text, moveCard, findCard }) => {
  const originalIndex = findCard(id).index;
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, originalIndex, text },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex, text } = monitor.getItem();
      const didDrop = monitor.didDrop();
      console.log(dropResult);
      if (!didDrop) {
        moveCard({ id: droppedId, text }, originalIndex);
      }
    }
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    canDrop: () => false,
    hover(draggedItem: Item) {
      if (draggedItem.id !== id) {
        const { index: overIndex } = findCard(id);
        moveCard({ id: draggedItem.id, text: draggedItem.text }, overIndex);
      }
    }
  });

  const opacity = isDragging ? 0 : 1;
  return (
    <div ref={node => drag(drop(node))} style={{ ...style, opacity }}>
      {text}
    </div>
  );
};

export default Card;
