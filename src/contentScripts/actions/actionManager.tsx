import React from 'react';
import { ReactDOMAppendChild } from '../utils/customCreateElement';
import './action-buttons.css';

class ActionsManager {
  addListActions = (lists: List[]) => {
    lists.forEach((list) => this.addActionButtonToList(list));
  };

  addActionButtonToList = (list: List) => {
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

  refreshCardsActions = (cards: Card[]) => {
    document.querySelectorAll('.card-actions').forEach((el) => el.remove());
    cards.forEach((card) => this.addActionButtonToCard(card));
  };

  addActionButtonToCard = (card: Card) => {
    const CardActionDiv = () => {
      return (
        <div>
          <button
            id={card.id}
            onClick={() => console.log('click', card)}
          >
            ADD DEPENDENCY
          </button>
        </div>
      );
    };
    ReactDOMAppendChild(<CardActionDiv />, card.cardElement, {
      className: `card-actions list-card div-${card.id}`,
      insertAfter: true,
    });
  };
}

export const actionsManager = new ActionsManager();
