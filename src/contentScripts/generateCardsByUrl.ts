/// <reference path="./index.ts" />
import { BUTTON_TEXTS } from '../shared/constants';
import { generateListExtensionTree } from './generateListExtensionTree';
import { addDependantCard } from './actions/addDependantCard';
import { updateCardText } from './actions/updateCardText';
import { resetCardText } from './actions/resetCardText';
import { cardsByCardUrl } from './index';
import { getLists } from './getTasks/trello/getLists';
import { getListData, addButtonToList } from './getTasks/trello/getListData';
import { getCards } from './getTasks/trello/getCards';
import { cardManager } from './getTasks/trello/cardManager';

declare var $: any;
let dependantCardUrl = '';

// function generateShowColumnDependenciesButton(listName: string) {
//   const button = document.createElement('button');
//   button.setAttribute('class', `div-graph-dep-action button-${listName}`);
//   button.innerHTML = BUTTON_TEXTS.SHOW_DEPENDENCIES;
//   button.id = listName;
//   button.addEventListener('click', (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     generateListExtensionTree(listName);
//   });
//   return button;
// }

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

function generateGraphDepActionSection(cardUrl: string) {
  const div = document.createElement('div');
  div.setAttribute('class', `div-graph-dep-action div-${cardUrl}`);
  const button = document.createElement('button');
  button.innerHTML = BUTTON_TEXTS.ADD_DEPENDENCY;
  button.id = cardUrl;
  button.addEventListener('click', (e) => {
    console.log('clické');
    e.preventDefault();
    e.stopPropagation();
    onDependanceButtonClick(cardUrl);
  });
  div.append(button);
  return { button, div };
}

export function generateCardsByUrl(): { [x: string]: Card } {
  console.log('here i gooooo gogo');
  let cardsByCardUrl: { [x: string]: Card } = {};

  $('.div-graph-dep-action').remove();

  cardManager.refresh();
  console.log(cardManager);

  return cardsByCardUrl;
}
