import { actionsManager } from './actionManager';

const bodyNode = document.querySelector('body');
const config = { subtree: true, childList: true };
let updateReferenceTimeout: NodeJS.Timeout;
let lastUpdateTime: number = 0;
const TIME_MS_TO_WAIT_BEFORE_UPDATE = 5000;

const refreshAllActions = () => {
  actionsManager.addRefreshActionsButton();
  actionsManager.updateAfterDOMChanges();
  lastUpdateTime = new Date().getTime();
  updateReferenceTimeout = null;
};

const refreshAllActionsCallback = (mutationsList: any) => {
  if (
    !updateReferenceTimeout ||
    new Date().getTime() - lastUpdateTime > TIME_MS_TO_WAIT_BEFORE_UPDATE * 3
  ) {
    clearTimeout(updateReferenceTimeout);
    updateReferenceTimeout = setTimeout(
      () => refreshAllActions(),
      TIME_MS_TO_WAIT_BEFORE_UPDATE,
    );
  }
};
const pageObserver = new MutationObserver(refreshAllActionsCallback);

export const initPageObserver = () => {
  pageObserver.observe(bodyNode, config);
};
