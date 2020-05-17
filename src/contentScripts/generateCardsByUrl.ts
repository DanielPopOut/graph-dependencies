/// <reference path="./index.ts" />
import { BUTTON_TEXTS } from '../shared/constants';
import { actionsManager } from './actions/actionManager';
import { addDependantCard } from './actions/addDependantCard';
import { resetCardText } from './actions/resetCardText';
import { updateCardText } from './actions/updateCardText';
import { cardManager } from './getTasks/trello/cardManager';
import { cardsByCardUrl } from './index';

declare var $: any;
let dependantCardUrl = '';

function onDependanceButtonClick(cardUrl: string) {
  console.log('all card', cardsByCardUrl);
  if (cardUrl && cardUrl === dependantCardUrl) {
    resetCardText(cardsByCardUrl);
    dependantCardUrl = '';
    return;
  }
  if (dependantCardUrl) {
    addDependantCard(cardsByCardUrl, cardUrl, dependantCardUrl);
    dependantCardUrl = '';
    return;
  }
  dependantCardUrl = cardUrl;
  updateCardText(cardsByCardUrl[cardUrl], BUTTON_TEXTS.DEPENDANT);
  Object.values(cardsByCardUrl).forEach((card) => {
    if (card.cardUrl !== dependantCardUrl) {
      updateCardText(card, BUTTON_TEXTS.SET_AS_PARENT);
    }
  });
}

export function generateCardsByUrl(): { [x: string]: Card } {
  console.log('here i gooooo gogo');
  let cardsByCardUrl: { [x: string]: Card } = {};

  $('.div-graph-dep-action').remove();

  cardManager.refresh();
  actionsManager.addListActions(cardManager.lists);
  actionsManager.refreshCardsActions(cardManager.cards);
  console.log(cardManager);

  return cardsByCardUrl;
}
