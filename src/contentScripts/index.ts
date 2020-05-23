import { actionsManager } from './actions/actionManager';

declare var chrome: any;


console.log('[GRAPH DEP EXTENSION LOADING]');
window.addEventListener('load', function () {
  actionsManager.addRefreshActionsButton();
});