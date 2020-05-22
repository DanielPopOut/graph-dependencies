import { COMMUNICATION_CONSTANTS } from '../shared/constants';
import { actionsManager } from './actions/actionManager';
import { dependencyManager } from './dependencyGraph/dependencyManager';

declare var chrome: any;

const {
  REFRESH_CARD_ID,
  SAVE_DEPENDENCIES_ID,
  RENDER_DEPENDENCIES_ID,
} = COMMUNICATION_CONSTANTS;

export let cardsByCardUrl: Record<string, ICard> = {};

chrome.runtime.onMessage.addListener(function (
  request: any,
  sender: any,
  sendResponse: any,
) {
  console.log('we have babael 8');
  console.log(
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension ',
  );
  console.log('new request came', request);
  switch (request.action) {
    case REFRESH_CARD_ID:
      actionsManager.initializeActions();
      break;
    case SAVE_DEPENDENCIES_ID:
      sendResponse(dependencyManager.getDependencies());
      break;
    case RENDER_DEPENDENCIES_ID:
      const { dependencies } = request.data;
      actionsManager.initializeActions();
      dependencyManager.renderDependencies(dependencies);
      break;
    default:
      break;
  }
});


if (document.readyState == 'loading') {
  // loading yet, wait for the event
  document.addEventListener('DOMContentLoaded',  function () {
    actionsManager.addRefreshActionsButton();
  });
} else {
  // DOM is ready!
  actionsManager.addRefreshActionsButton();
}
