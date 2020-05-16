import { createDependencyGraph } from '../contentScripts/dependencyGraph/createDependencyGraph';
import { cardDependenciesFixture } from '../contentScripts/fixtures/cardDependencies.fixture';
import { cardsByCardUrlFixture } from '../contentScripts/fixtures/cardsByCardUrl.fixture';

export const createTestDependency = () => {
  createDependencyGraph(cardDependenciesFixture, cardsByCardUrlFixture as any);
};

//@ts-ignore
globalThis.createTestDependency = createTestDependency;
