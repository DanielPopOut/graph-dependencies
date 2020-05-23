import { cardsByIdFixture } from '../contentScripts/fixtures/cardsByIdFixture.fixture';
import { dependencyManager } from '../contentScripts/dependencyGraph/dependencyManager';

export const createTestDependency = () => {
  dependencyManager.createDependencyGraph(cardsByIdFixture);
};

//@ts-ignore
globalThis.createTestDependency = createTestDependency;
