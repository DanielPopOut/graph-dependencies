import { cardManager } from '../getTasks/trello/cardManager';
import { actionsManager } from '../actions/actionManager';

class DependencyManager {
  getDependencies = (
    cardsById: Record<string, ICard> = cardManager.cardsById,
  ) => {
    return Object.entries(cardsById).reduce<{ [x: string]: string[] }>(
      (finalDependencies, [cardId, card]) => {
        if (card.children.size > 0) {
          return {
            ...finalDependencies,
            [cardId]: Array.from(card.children),
          };
        }
        return finalDependencies;
      },
      {},
    );
  };

  renderDependencies = (dependencyObj: DependencyGraph) => {
    Object.entries(dependencyObj).map(([parentId, childrenIds]) => {
      childrenIds.map((childId) => {
        if (cardManager.cardsById[parentId] && cardManager.cardsById[childId]) {
          cardManager.addDependency(childId, parentId);
        }
      });
    });
    actionsManager.refreshCardsActions();
  };
}

export const dependencyManager = new DependencyManager();
