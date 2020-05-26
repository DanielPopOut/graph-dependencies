import React, { useRef, useEffect } from 'react';

import { ReactDOMAppendChild } from '../utils/customCreateElement';
import './action-buttons.css';
import { cardService } from '../modules/cards/card.service';
import { DependencyTag } from './components/DependencyTag';
import { dependencyManager } from '../dependencyGraph/dependencyManager';
import { AbstractManager } from '../customManagers/AbstractManager';

declare var chrome: any;
declare var cardManager: AbstractManager;

const STORAGE_KEYS = {
  DEPENDENCIES: 'DEPENDENCIES_SAVED',
};

class ActionsManager {
  dependencyCardId: string;
  selectedLists = new Set<string>();

  toggleList = (listName: string) => {
    this.selectedLists.has(listName)
      ? this.selectedLists.delete(listName)
      : this.selectedLists.add(listName);
    this.refreshListActions(cardManager.lists);
  };

  getCardsInSelectedLists = (
    cardsById: Record<string, ICard>,
    selectedList: Set<string>,
  ) =>
    selectedList.size
      ? Object.fromEntries(
          Object.entries(cardsById).filter(([_, card]) =>
            selectedList.has(card.listName),
          ),
        )
      : cardsById;

  addRefreshActionsButton = () => {
    const RefreshActionsButton = () => (
      <button onClick={() => this.initializeActions()}>Refresh actions</button>
    );
    const ShowDependenciesButton = () => (
      <button
        onClick={() => {
          dependencyManager.createDependencyGraph(
            this.getCardsInSelectedLists(
              cardManager.cardsById,
              this.selectedLists,
            ),
          );
        }}
      >
        Show dependencies
      </button>
    );
    const SaveDependencies = () => (
      <button
        onClick={() => {
          const dependencyToSave = dependencyManager.getDependencies();
          chrome.storage.local.set(
            { [STORAGE_KEYS.DEPENDENCIES]: dependencyToSave },
            () => {
              this.copyDependenciesToClipboard(
                JSON.stringify(dependencyToSave),
              );
              alert('Dependencies saved and copied to clipboard');
            },
          );
        }}
      >
        Save
      </button>
    );
    const RestoreDependencies = () => (
      <button
        onClick={() => {
          chrome.storage.local.get(
            [STORAGE_KEYS.DEPENDENCIES],
            (result: any) => {
              const dependencies = result[STORAGE_KEYS.DEPENDENCIES] || {};
              this.initializeActions();
              dependencyManager.renderDependencies(dependencies);
            },
          );
        }}
      >
        Restore
      </button>
    );
    ReactDOMAppendChild(
      <>
        <RefreshActionsButton />
        <ShowDependenciesButton />
        <SaveDependencies />
        <RestoreDependencies />
      </>,
      document.querySelector(cardManager.insertElementForActionSelector),
      { className: 'refresh-action-div' },
    );
  };

  initializeActions = () => {
    document
      .querySelectorAll('.div-graph-dep-action')
      .forEach((el) => el.remove());
    this.addRefreshActionsButton();
    cardManager.refresh();
    // TODO : update actions behind addListActions
    actionsManager.refreshListActions(cardManager.lists);
    actionsManager.refreshCardsActions(cardManager.cards);
  };

  refreshListActions = (lists: IList[]) => {
    document.querySelectorAll('.list-actions').forEach((el) => el.remove());
    lists.forEach((list) => this.addActionButtonToList(list));
  };

  addActionButtonToList = (list: IList) => {
    const isListSelected = this.selectedLists.has(list.name);
    const ListDependenciesButton = () => (
      <button
        className='bar'
        id={list.name}
        onClick={() => {
          this.toggleList(list.name);
        }}
      >
        {isListSelected ? 'LIST SELECTED' : 'SELECT THIS LIST'}
      </button>
    );
    ReactDOMAppendChild(<ListDependenciesButton />, list.actionInsertElement, {
      className: `list-actions`,
    });
  };

  refreshCardsActions = (cards: ICard[] = cardManager.cards) => {
    document.querySelectorAll('.card-actions').forEach((el) => el.remove());
    cards.forEach((card) => this.addActionButtonToCard(card));
  };

  addActionButtonToCard = (card: ICard) => {
    const CardActionDiv = () => {
      const buttonRef = useRef();

      useEffect(() => {
        //@ts-ignore
        buttonRef.current.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.onCardDependencyActionClick(card.id);
        });
      }, []);
      return (
        <div>
          <button id={card.id} ref={buttonRef}>
            {cardService.getCardDependencyText(this.dependencyCardId, card.id)}
          </button>
          {Array.from(card.dependencies).map((dependencyId) => (
            <DependencyTag
              key={cardManager.cardsById[dependencyId].id}
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
      className: `card-actions div-${card.id}`,
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
    this.refreshCardsActions();
  };

  copyDependenciesToClipboard = (str: string) => {
    // Code from https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
    const el = document.createElement('textarea'); // Create a <textarea> element
    el.value = str; // Set its value to the string that you want copied
    el.setAttribute('readonly', ''); // Make it readonly to be tamper-proof
    el.style.position = 'absolute';
    el.style.left = '-9999px'; // Move outside the screen to make it invisible
    document.body.appendChild(el); // Append the <textarea> element to the HTML document
    const selected =
      document.getSelection().rangeCount > 0 // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0) // Store selection if found
        : false; // Mark as false to know no selection existed before
    el.select(); // Select the <textarea> content
    document.execCommand('copy'); // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el); // Remove the <textarea> element
    if (selected) {
      // If a selection existed before copying
      document.getSelection().removeAllRanges(); // Unselect everything on the HTML document
      document.getSelection().addRange(selected); // Restore the original selection
    }
  };
}

export const actionsManager = new ActionsManager();
