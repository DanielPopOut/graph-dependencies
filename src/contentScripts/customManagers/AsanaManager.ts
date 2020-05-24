import { AbstractManager } from './AbstractManager';

class AsanaManager extends AbstractManager {
  insertElementForActionSelector = '.PageToolbarStructure-leftChildren';

  getLists = (): IList[] => {
    return [...document.querySelectorAll('.BoardColumn')].map((listElement) =>
      this.getListData(listElement),
    );
  };

  getListData = (list: Element): IList => {
    const listNameElement = list.querySelector('.BoardColumnHeaderTitle');
    return {
      name: listNameElement.innerHTML,
      listElement: list,
      actionInsertElement: listNameElement.parentElement,
    };
  };

  getCards = () => {
    return this.lists.reduce(
      (allCards, list) => [...allCards, ...this.getCardsFromList(list)],
      [],
    );
  };

  getCardsFromList = (list: IList) => {
    const cardElements = list.listElement.querySelectorAll(
      '.BoardCard-contents',
    );
    return [...cardElements].map((cardElement) =>
      this.getCardDetails(cardElement, list.name),
    );
  };

  getCardDetails = (cardElement: Element, listName: string) => {
    const cardName = cardElement.querySelector('.BoardCard-name').innerHTML;

    const card: ICard = {
      id: cardName,
      href: '',
      cardNumber: '',
      cardName,
      labels: [],
      listName,
      children: new Set(),
      dependencies: new Set(),
      cardElement,
    };
    return card;
  };
}

console.info('[GRAPH DEP EXTENSION] :  injected asana manager');
(window as any).cardManager = new AsanaManager();
