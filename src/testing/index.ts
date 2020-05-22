import { cardsByCardUrlFixture } from '../contentScripts/fixtures/cardsByCardUrl.fixture';
import { dependencyManager } from '../contentScripts/dependencyGraph/dependencyManager';

export const createTestDependency = () => {
  dependencyManager.createDependencyGraph(cardsByCardUrlFixture);
};

//@ts-ignore
globalThis.createTestDependency = createTestDependency;
