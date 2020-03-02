import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Card from './card';
import update from 'immutability-helper';
import ItemTypes from './item-types';
import { ICard, IContainerProps } from './models';

const style = {
  width: 400,
};

const Container: React.FC<IContainerProps> = ({ Items, ContainerId }) => {
  const [cards, setCards] = useState(Items);

  const findCard = (id: number) => {
    const card = cards.filter(c => c.id === id)[0];
    return {
      card,
      index: cards.indexOf(card),
      ContainerId,
    };
  };

  const removeCard = (id: number) => {
    const index = findCard(id).index;

    setCards(
      update(cards, {
        $splice: [[index, 1]],
      })
    );
  };

  const moveCard = (card: ICard, atIndex: number) => {
    const index = findCard(card.id).index;

    setCards(
      update(cards, {
        $splice: [
          [index, index > -1 ? 1 : 0],
          [atIndex, 0, card],
        ],
      })
    );
  };

  const [, drop] = useDrop({ accept: ItemTypes.CARD });
  return (
    <>
      <div ref={drop} style={style}>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            ContainerId={ContainerId}
            moveCard={moveCard}
            findCard={findCard}
            removeCard={removeCard}
          />
        ))}
      </div>
    </>
  );
};
export default Container;
