import { generateButton } from '../getTasks/trello/generateButton';

class ActionsManager {
  addListActions = (lists: List[]) => {
    lists.map((list) => this.addButtonToList(list));
  };

  addButtonToList = (list: List) => {
    const listButton = generateButton({
      text: 'LIST DEPENDENCIES',
      id: list.name,
      onClick: () => console.log(list),
    });
    list.actionInsertElement.appendChild(listButton);
  };

  addCardsActions = (cards: Card[]) => {
    cards.map((card) => this.addActionButtonToCard(card));
  };

  addActionButtonToCard = (card: Card) => {
    const { button, div } = generateGraphDepActionSection(card.cardUrl);
    card.cardElement.appendChild(div);
    card.button = button;
  };
}

const generateGraphDepActionSection = (cardUrl: string) => {
  const div = document.createElement('div');
  div.setAttribute('class', `div-graph-dep-action div-${cardUrl}`);
  const button = generateButton({
    text: 'ADD DEPENDENCY',
    id: cardUrl,
    onClick: () => console.log('carte cliquée', cardUrl),
  });
  div.append(button);
  return { button, div };
};

export const actionsManager = new ActionsManager();
