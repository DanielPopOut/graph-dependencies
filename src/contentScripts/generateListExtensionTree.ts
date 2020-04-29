import { createDependencyGraph } from './dependencyGraph/createDependencyGraph';
import { cardsByCardUrl } from './index';

export function generateListExtensionTree(listName: string) {
  const cards = Object.values(cardsByCardUrl)
    .filter((card) => card.listName === listName)
    .slice();
  const cardIdsSet = new Set(cards.map((card) => card.cardUrl));

  //Remove dependencies from cards when parent card is not in the list
  const cardDependancies = cards.reduce<Record<string, CardDependency>>(
    (finalCardDependencies, card) => {
      const cardDependencies = [...card.dependencies].filter((dependency) =>
        cardIdsSet.has(dependency),
      );
      const cardChildren = [...card.children].filter((child) =>
        cardIdsSet.has(child),
      );
      finalCardDependencies[card.cardUrl] = {
        cardUrl: card.cardUrl,
        dependencies: cardDependencies,
        children: cardChildren,
      };
      return finalCardDependencies;
    },
    {},
  );

  console.log(cardDependancies);
  createDependencyGraph(cardDependancies, cardsByCardUrl);
}
