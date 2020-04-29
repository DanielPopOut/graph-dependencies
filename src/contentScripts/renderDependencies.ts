import { addDependantCard } from './actions/addDependantCard';
import { cardsByCardUrl } from './index';

export function renderDependencies(dependencyObj: DependencyGraph) {
  console.log('Dependencies obj', dependencyObj);
  Object.entries(dependencyObj).map(([parentId, childrenIds]) => {
    childrenIds.map((childrenId) => {
      if (cardsByCardUrl[parentId] && cardsByCardUrl[childrenId]) {
        addDependantCard(cardsByCardUrl, parentId, childrenId);
      }
    });
  });
}
