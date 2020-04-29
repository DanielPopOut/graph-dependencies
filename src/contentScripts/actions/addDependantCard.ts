import { resetCardText } from './resetCardText';

declare var $: any;

export function addDependantCard(
  cardsByCardUrl: Record<string, Card>,
  parentCardUrl: string,
  dependantCardUrl: string,
) {
  updateParentCard(cardsByCardUrl[parentCardUrl], dependantCardUrl);
  updateChildCard(cardsByCardUrl[dependantCardUrl], parentCardUrl);
  rerenderCardWithDependencies(
    cardsByCardUrl[dependantCardUrl],
    cardsByCardUrl,
  );
  resetCardText(cardsByCardUrl);
}

function updateChildCard(card: Card, parentCardUrl: string) {
  card.dependencies.add(parentCardUrl);
  console.log('update child', card);
}

function updateParentCard(card: Card, dependantCardUrl: string) {
  console.log('update parent');
  card.children.add(dependantCardUrl);
}

function rerenderCardWithDependencies(
  card: Card,
  cardsByCardUrl: Record<string, Card>,
) {
  const { cardUrl, dependencies } = card;
  const divToUdpate = $(`.div-${cardUrl}`)[0];
  divToUdpate.innerHTML = '';
  divToUdpate.append(card.button);
  dependencies.forEach((parentCardUrl0) => {
    const dependancyLink = generateDependencyLink(
      cardsByCardUrl[parentCardUrl0],
    );
    divToUdpate.append(dependancyLink);
  });
}

function generateDependencyLink(card: Card) {
  const childLink = document.createElement('a');
  childLink.innerHTML = card.cardNumber;
  childLink.href = card.href;
  childLink.setAttribute(
    'style',
    'margin: 0 3px; padding: 3px; text-decoration: none; background: #f5dd5c; border-radius: 3px;',
  );
  return childLink;
}
