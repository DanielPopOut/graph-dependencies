/// <reference path="./index.ts" />
import { actionsManager } from './actions/actionManager';
import { cardManager } from './getTasks/trello/cardManager';

export function generateCardsByUrl(): { [x: string]: ICard } {
  let cardsByCardUrl: { [x: string]: ICard } = {};

  document
    .querySelectorAll('.div-graph-dep-action')
    .forEach((el) => el.remove());

  cardManager.refresh();
  actionsManager.addListActions(cardManager.lists);
  actionsManager.refreshCardsActions(cardManager.cards);
  console.log(cardManager);

  return cardsByCardUrl;
}
