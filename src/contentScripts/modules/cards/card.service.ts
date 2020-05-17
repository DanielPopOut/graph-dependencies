const ACTIONS_CONST = {
  ADD_DEPENDENCY: 'ADD DEPENDENCY',
  SET_AS_PARENT: 'SET AS PARENT',
  CHILD_SELECTED: 'CHILD SELECTED',
};

class CardService {
  getCardDependencyText = (dependencyCardId: string, cardId: string) => {
    if (!dependencyCardId) {
      return ACTIONS_CONST.ADD_DEPENDENCY;
    }

    return dependencyCardId === cardId
      ? ACTIONS_CONST.CHILD_SELECTED
      : ACTIONS_CONST.SET_AS_PARENT;
  };
}

export const cardService = new CardService();
