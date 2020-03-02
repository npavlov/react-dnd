export interface ICard {
  id: number;
  text: string;
}

export interface IContainerProps {
  Items: ICard[];
  ContainerId: number;
}

export interface ICardProps {
  moveCard: (card: ICard, to: number) => void;
  findCard: (id: number) => { index: number; ContainerId: number; card: ICard };
  removeCard: (id: number) => void;
  card: ICard;
  ContainerId: number;
}

export interface Item {
  type: string;
  originalIndex: string;
  card: ICard;
  ContainerId: number;
  removeCard: (id: number) => void;
}
