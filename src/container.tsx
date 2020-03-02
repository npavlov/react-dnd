import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Card from './card';
import update from 'immutability-helper';
import ItemTypes from './item-types';
import { ICard } from './models';

const style = {
  width: 400
};

interface IProps {
  Items: ICard[];
}

const Container: React.FC<IProps> = ({ Items }) => {
  const [cards, setCards] = useState(Items);

  const moveCard = (card: ICard, atIndex: number) => {
    //console.log(card, Items);
    const index = findCard(card.id).index;
    console.log(card, index);
    setCards(
      update(cards, {
        $splice: [
          [index, index > -1 ? 1 : 0],
          [atIndex, 0, card]
        ]
      })
    );
  };

  const findCard = (id: number) => {
    const card = cards.filter(c => c.id === id)[0];
    return {
      card,
      index: cards.indexOf(card)
    };
  };

  const [, drop] = useDrop({ accept: ItemTypes.CARD });
  return (
    <>
      <div ref={drop} style={style}>
        {cards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
            findCard={findCard}
          />
        ))}
      </div>
    </>
  );
};
export default Container;
