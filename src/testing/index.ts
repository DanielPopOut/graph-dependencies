import { cardsByIdFixture } from '../contentScripts/fixtures/cardsByIdFixture.fixture';
import { dependencyManager } from '../contentScripts/dependencyGraph/dependencyManager';
import { actionsManager } from '../contentScripts/actions/actionManager';
import { TrelloManager } from '../contentScripts/customManagers/TrelloManager';

export const createTestDependency = () => {
  dependencyManager.createDependencyGraph(cardsByIdFixture);
};

const b =new TrelloManager();

//@ts-ignore
globalThis.cardManager= b;
actionsManager.initializeActions();

//@ts-ignore
globalThis.createTestDependency = createTestDependency;
