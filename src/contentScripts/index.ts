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

if (document.readyState == 'loading') {
  // loading yet, wait for the event
  document.addEventListener('DOMContentLoaded',  function () {
    actionsManager.addRefreshActionsButton();
  });
} else {
  // DOM is ready!
  actionsManager.addRefreshActionsButton();
}
