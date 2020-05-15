import { createDependencyGraph } from '../contentScripts/dependencyGraph/createDependencyGraph';
import { cardDependenciesFixture } from '../contentScripts/fixtures/cardDependencies.fixture';
import { cardsByCardUrlFixture } from '../contentScripts/fixtures/cardsByCardUrl.fixture';

createDependencyGraph(cardDependenciesFixture, cardsByCardUrlFixture as any);

console.log('createDEpendencyGraph');
