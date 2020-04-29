/// <reference path="./index.ts" />
import { BUTTON_TEXTS } from '../shared/constants';
import { generateListExtensionTree } from './generateListExtensionTree';
import { addDependantCard } from './actions/addDependantCard';
import { updateCardText } from './actions/updateCardText';
import { resetCardText } from './actions/resetCardText';
import { cardsByCardUrl } from './index';

declare var $: any;
let dependantCardUrl = '';

function generateShowColumnDependenciesButton(listName: string) {
  const button = document.createElement('button');
  button.setAttribute('class', `div-graph-dep-action button-${listName}`);
  button.innerHTML = BUTTON_TEXTS.SHOW_DEPENDENCIES;
  button.id = listName;
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    generateListExtensionTree(listName);
  });
  return button;
}

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
  console.log('here i gooooo');
  let cardsByCardUrl: { [x: string]: Card } = {};

  $('.div-graph-dep-action').remove();

  const lists = $('.js-list').map(function () {
    const list = $(this).find('.list-header-name');
    const listName = list.text();
    const listButton = generateShowColumnDependenciesButton(listName);
    $(listButton).insertAfter(list);

    const cards = $(this)
      .find('.list-card')
      .map(function () {
        const href = $(this).attr('href');
        const [_, prefix, cardSlug, cardNumberAndName] = href
          ? href.split('/')
          : ['', '', 'fakeSlug', 'fakeNumber-fakeNaaaaame'];
        // const cardUrl = prefix + '/' + cardSlug;
        const cardUrl = cardSlug;
        const [cardNumber, ...cardName] = cardNumberAndName.split('-');

        const labels = $(this)
          .find('.card-label')
          .map(function () {
            return {
              classes: $(this).attr('class'),
              text: $(this).find('.label-text').text(),
            };
          });

        const { button, div } = generateGraphDepActionSection(cardUrl);
        $(this).append(div);

        const finalObj: Card = {
          href,
          cardUrl,
          cardNumber,
          cardName,
          labels,
          button,
          listName,
          children: new Set(),
          dependencies: new Set(),
        };
        cardsByCardUrl[cardUrl] = finalObj;
        return finalObj;
      });
  });

  return cardsByCardUrl;
}
