import React from 'react';
import { ReactDOMAppendChild } from '../utils/customCreateElement';
import './action-buttons.css';
import { cardManager } from '../getTasks/trello/cardManager';
import { cardService } from '../modules/cards/card.service';
import { DependencyTag } from './components/DependencyTag';

class ActionsManager {
  dependencyCardId: string;

  addRefreshActionsButton = () => {
    const refreshActionsButton = (
      <button onClick={() => this.initializeActions()}>Refresh actions</button>
    );
    ReactDOMAppendChild(
      refreshActionsButton,
      document.querySelector('.board-header'),
      { className: 'refresh-action-div' },
    );
  };

  initializeActions = () => {
    document
      .querySelectorAll('.div-graph-dep-action')
      .forEach((el) => el.remove());
    this.addRefreshActionsButton();
    cardManager.refresh();
    actionsManager.addListActions(cardManager.lists);
    actionsManager.refreshCardsActions(cardManager.cards);
  };

  addListActions = (lists: IList[]) => {
    lists.forEach((list) => this.addActionButtonToList(list));
  };

  addActionButtonToList = (list: IList) => {
    const ListDependenciesButton = () => (
      <button
        className='bar'
        id={list.name}
        onClick={(e) => console.log(list, e)}
      >
        LIST DEPENDENCIES
      </button>
    );
    ReactDOMAppendChild(<ListDependenciesButton />, list.actionInsertElement);
  };

  refreshCardsActions = (cards: ICard[] = cardManager.cards) => {
    document.querySelectorAll('.card-actions').forEach((el) => el.remove());
    cards.forEach((card) => this.addActionButtonToCard(card));
  };

  addActionButtonToCard = (card: ICard) => {
    const CardActionDiv = () => {
      return (
        <div>
          <button
            id={card.id}
            onClick={() => {
              this.onCardDependencyActionClick(card.id);
              this.refreshCardsActions();
            }}
          >
            {cardService.getCardDependencyText(this.dependencyCardId, card.id)}
          </button>
          {Array.from(card.dependencies).map((dependencyId) => (
            <DependencyTag
              card={cardManager.cardsById[dependencyId]}
              onClose={() => {
                cardManager.removeDependency(card.id, dependencyId);
                this.refreshCardsActions();
              }}
            />
          ))}
        </div>
      );
    };
    ReactDOMAppendChild(<CardActionDiv />, card.cardElement, {
      className: `card-actions list-card div-${card.id}`,
      insertAfter: true,
    });
  };

  onCardDependencyActionClick = (cardId: string) => {
    if (this.dependencyCardId === cardId || !cardId) {
      this.dependencyCardId = '';
    } else if (!this.dependencyCardId) {
      this.dependencyCardId = cardId;
    } else {
      cardManager.addDependency(this.dependencyCardId, cardId);
      this.dependencyCardId = '';
    }
  };
}

export const actionsManager = new ActionsManager();
