import { AbstractManager } from './AbstractManager';

class TrelloManager extends AbstractManager {
  lists: IList[] = [];
  cardsById: Record<string, ICard> = {};
  insertElementForActionSelector = '.board-header';

  get cards() {
    return Object.values(this.cardsById);
  }

  getLists = (): IList[] => {
    return [...document.querySelectorAll('.js-list')].map((listElement) =>
      this.getListData(listElement),
    );
  };

  getListData = (list: Element): IList => {
    const listNameElement = list.querySelector('.list-header-name');
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
    const cardElements = list.listElement.querySelectorAll('.list-card');
    return [...cardElements].map((cardElement) =>
      this.getCardDetails(cardElement, list.name),
    );
  };

  getCardDetails = (cardElement: Element, listName: string) => {
    const href = cardElement.getAttribute('href');
    const [_, prefix, cardId, cardNumberAndName] = href
      ? href.split('/')
      : ['', '', 'noCardSlug', 'noNumber - noName'];
    const [cardNumber, ...cardName] = cardNumberAndName.split('-');

    const labels = [...cardElement.querySelectorAll('.card-label')].map(
      (labelElement) => {
        return {
          classes: labelElement.getAttribute('class'),
          text: labelElement.querySelector('.label-text').innerHTML,
        };
      },
    );

    const card: ICard = {
      id: cardId,
      href,
      cardNumber,
      cardName: cardName.join(' '),
      labels,
      listName,
      children: new Set(),
      dependencies: new Set(),
      cardElement,
    };
    return card;
  };
}

console.info('[GRAPH DEP EXTENSION] :  injected trello manager');
(window as any).cardManager = new TrelloManager();
