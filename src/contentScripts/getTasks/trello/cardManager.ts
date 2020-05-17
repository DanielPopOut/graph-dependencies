import { getLists } from './getLists';
import { getCards } from './getCards';

class CardManager {
  lists: IList[] = [];
  cardsById: Record<string, ICard> = {};
  dependencyCardId: string;

  get cards() {
    return Object.values(this.cardsById);
  }

  refresh = () => {
    this.getLists();
    this.getCards();
  };

  getLists = () => {
    this.lists = getLists();
  };

  getCards = () => {
    this.cardsById = getCards(this.lists).reduce(
      (cardsByIdAccumulator, card) => ({
        ...cardsByIdAccumulator,
        [card.id]: card,
      }),
      {},
    );
  };

  addDependency = (childCardId: string, parentCardId: string) => {
    this.cardsById[childCardId].dependencies.add(parentCardId);
    this.cardsById[parentCardId].children.add(childCardId);
  };

  removeDependency = (childCardId: string, parentCardId: string) => {
    this.cardsById[childCardId].dependencies.delete(parentCardId);
    this.cardsById[parentCardId].children.delete(childCardId);
  };
}
export const cardManager = new CardManager();
