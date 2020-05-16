import { COMMUNICATION_CONSTANTS } from '../shared/constants';
import { generateCardsByUrl } from './generateCardsByUrl';
import { getDependencies } from './getDependencies';
import { renderDependencies } from './renderDependencies';

declare var chrome: any;
declare var $: any;

const {
  REFRESH_CARD_ID,
  SAVE_DEPENDENCIES_ID,
  RENDER_DEPENDENCIES_ID,
} = COMMUNICATION_CONSTANTS;

export let cardsByCardUrl: Record<string, Card> = {};

chrome.runtime.onMessage.addListener(function (
  request: any,
  sender: any,
  sendResponse: any,
) {
  console.log(
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension ',
  );
  console.log('new request came', request);
  switch (request.action) {
    case REFRESH_CARD_ID:
      cardsByCardUrl = generateCardsByUrl();
      break;
    case SAVE_DEPENDENCIES_ID:
      sendResponse(getDependencies(cardsByCardUrl));
      break;
    case RENDER_DEPENDENCIES_ID:
      const { dependencies } = request.data;
      cardsByCardUrl = generateCardsByUrl();
      renderDependencies(dependencies);
      break;
    default:
      break;
  }
});

console.log('im in 2');

// function showColumnDependenciesButton(listName) {
//   console.log(
//     Object.values(cardsByCardUrl).filter(card => card.listName === listName)
//   );
// }

// function setDisplay() {
//   const textCheck = document.createElement('button');
//   textCheck.innerHTML = 'Yeah';
//   textCheck.setAttribute(
//     'style',
//     'position:fixed; top: 0; right: 0; background: blue; z-index: 1;',
//   );
//   $('body').append(textCheck);
// }
