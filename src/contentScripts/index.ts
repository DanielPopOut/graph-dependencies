import { actionsManager } from './actions/actionManager';

console.log('[GRAPH DEP EXTENSION LOADING]');
window.addEventListener('load', function () {
  actionsManager.addRefreshActionsButton();
});