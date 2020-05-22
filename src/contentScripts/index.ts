import { actionsManager } from './actions/actionManager';

declare var chrome: any;

export let cardsByCardUrl: Record<string, ICard> = {};

if (document.readyState == 'loading') {
  // loading yet, wait for the event
  document.addEventListener('DOMContentLoaded', function () {
    actionsManager.addRefreshActionsButton();
  });
} else {
  // DOM is ready!
  actionsManager.addRefreshActionsButton();
}
