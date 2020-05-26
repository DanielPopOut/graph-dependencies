export abstract class AbstractManager {
  lists: IList[] = [];
  cardsById: Record<string, ICard> = {};
  abstract insertElementForActionSelector: string;
  // Here are the functions to update lists and cards
  abstract getLists: () => IList[];
  abstract getCards: () => ICard[];

  get cards() {
    return Object.values(this.cardsById);
  }

  refresh() {
    this.lists = this.getLists();
    this.cardsById = this.getCards().reduce(
      (cardsByIdAccumulator, card) => ({
        ...cardsByIdAccumulator,
        [card.id]: card,
      }),
      {},
    );
  }

  addDependency = (childCardId: string, parentCardId: string) => {
    this.cardsById[childCardId].dependencies.add(parentCardId);
    this.cardsById[parentCardId].children.add(childCardId);
  };

  removeDependency = (childCardId: string, parentCardId: string) => {
    this.cardsById[childCardId].dependencies.delete(parentCardId);
    this.cardsById[parentCardId].children.delete(childCardId);
  };
}
