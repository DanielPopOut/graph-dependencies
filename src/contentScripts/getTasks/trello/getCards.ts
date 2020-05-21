import { generateButton } from './generateButton';

export const getCards = (listElements: IList[]): ICard[] => {
  return listElements.reduce(
    (allCards, list) => [...allCards, ...getCardsFromList(list)],
    [],
  );
};

export const getCardsFromList = (list: IList) => {
  const cardElements = list.listElement.querySelectorAll('.list-card');
  return [...cardElements].map((cardElement) =>
    getCardDetails(cardElement, list.name),
  );
};

export const getCardDetails = (cardElement: Element, listName: string) => {
  const href = cardElement.getAttribute('href');
  const [_, prefix, cardId, cardNumberAndName] = href
    ? href.split('/')
    : ['', '', 'noCardSlug', 'noNumber - noName'];
  // const cardUrl = prefix + '/' + cardSlug;
  const cardUrl = cardId;
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
    cardUrl,
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
