import { cardManager } from '../getTasks/trello/cardManager';
import { actionsManager } from '../actions/actionManager';
import { createDependencyGraph } from './createDependencyGraph';

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

  generateDependencyTree = (cards: Record<string, ICard>) => {
    const cardIdsToKeep = new Set(Object.keys(cards));

    //Remove dependencies from cards when parent card is not in the list
    const cardDependencies = Object.values(cards).reduce<
      Record<string, CardDependency>
    >((finalCardDependencies, card) => {
      const cardDependencies = [
        ...card.dependencies,
      ].filter((dependencyCardId) => cardIdsToKeep.has(dependencyCardId));
      const cardChildren = [...card.children].filter((childCardId) =>
        cardIdsToKeep.has(childCardId),
      );
      finalCardDependencies[card.cardUrl] = {
        cardUrl: card.cardUrl,
        dependencies: cardDependencies,
        children: cardChildren,
      };
      return finalCardDependencies;
    }, {});

    return cardDependencies;
  };

  createDependencyGraph = (cardsById: Record<string, ICard>) => {
    createDependencyGraph(this.generateDependencyTree(cardsById), cardsById);
  };
}

export const dependencyManager = new DependencyManager();
