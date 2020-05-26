import React, { useRef, useEffect } from 'react';

import { ReactDOMAppendChild } from '../utils/customCreateElement';
import './action-buttons.css';
import { cardService } from '../modules/cards/card.service';
import { DependencyTag } from './components/DependencyTag';
import { dependencyManager } from '../dependencyGraph/dependencyManager';
import { AbstractManager } from '../customManagers/AbstractManager';
import { StorageService } from './storageService';

declare var cardManager: AbstractManager;

class ActionsManager {
  dependencyCardId: string;
  selectedLists = new Set<string>();

  toggleList = (listName: string) => {
    this.selectedLists.has(listName)
      ? this.selectedLists.delete(listName)
      : this.selectedLists.add(listName);
    this.refreshListActions(cardManager.lists);
    this.saveData();
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

  saveData = (copyConfig = false) => {
    const dependencies = dependencyManager.getDependencies();
    if (Object.values(dependencies).length || this.selectedLists.size) {
      StorageService.saveLocalStorageConfiguration(
        {
          dependencies,
          selectedLists: Array.from(this.selectedLists),
        },
        copyConfig,
      );
    } else {
      alert('No dependencies found');
    }
  };

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
    const RestoreDependenciesButton = () => (
      <button
        onClick={() => {
          const configRetrievedString = prompt(
            'Veuillez entrer la configuration de restauration fournie svp',
          );
          if (configRetrievedString) {
            try {
              const config: IStorageData = JSON.parse(configRetrievedString);
              this.restoreConfiguraton(config);
            } catch (e) {
              alert('Invalid configuration, check JSON data please');
            }
          }
        }}
      >
        Restore config
      </button>
    );
    const CopyDependencies = () => (
      <button onClick={() => this.saveData(true)}>Copy config</button>
    );
    ReactDOMAppendChild(
      <>
        <RefreshActionsButton />
        <ShowDependenciesButton />
        <CopyDependencies />
        <RestoreDependenciesButton />
      </>,
      document.querySelector(cardManager.insertElementForActionSelector),
      { className: 'refresh-action-div' },
    );
  };

  restoreConfiguraton = ({ dependencies, selectedLists }: IStorageData) => {
    this.selectedLists = new Set(selectedLists);
    actionsManager.refreshListActions(cardManager.lists);
    dependencyManager.renderDependencies(dependencies);
  };

  initializeActions = () => {
    document
      .querySelectorAll('.div-graph-dep-action')
      .forEach((el) => el.remove());
    this.addRefreshActionsButton();
    cardManager.refresh();
    this.restoreConfiguraton(StorageService.getLocalStorageConfiguration());
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
                this.saveData();
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
      this.saveData();
      this.dependencyCardId = '';
    }
    this.refreshCardsActions();
  };
}

export const actionsManager = new ActionsManager();
