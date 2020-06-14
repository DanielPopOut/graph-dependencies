import { actionsManager } from './actions/actionManager';
import { initPageObserver } from './actions/refreshService';

console.log('[GRAPH DEP EXTENSION LOADING]');
window.addEventListener('load', function () {
  actionsManager.addRefreshActionsButton();
  initPageObserver();
});
