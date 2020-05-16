import { getLists } from './getLists';
import { getCards } from './getCards';

class CardManager {
  lists: List[] = [];
  cards: Card[] = [];

  refresh = () => {
    this.getLists();
    this.getCards();
  };

  getLists = () => {
    console.log('i get lists');
    this.lists = getLists();
  };

  getCards = () => {
    this.cards = getCards(this.lists);
  };
}
export const cardManager = new CardManager();
