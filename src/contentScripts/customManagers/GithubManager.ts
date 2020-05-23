import { AbstractManager } from './AbstractManager';

interface GithubCardAttributes {
  class: string; // 'issue-card project-card position-relative rounded-2 box-shadow bg-white my-2 mx-0 border ws-normal js-project-column-card js-socket-channel js-updatable-content draggable js-keyboard-movable';
  id: string; //'card-38786418';
  tabindex: string; //'0';
  'data-retain-focus': string; // '';
  'data-channel': string; //'projects:cards:38786418';
  'data-url': string; //'/DanielPopOut/graph-dependencies/projects/1/cards/38786418';
  'data-card-id': string; // '38786418';
  'data-column-id': string; //'9249163';
  'data-content-type': string; //'';
  'data-content-id': string; //'';
  'data-card-author': string; //'["danielpopout"]';
  'data-card-state': string; //'["open"]';
  'data-card-title': string; //'["[3]","test","card","good","think"]';
  'data-card-type': string; //'["note"]';
  'data-card-is': string; //'["open","note"]';
}

class GithubManager extends AbstractManager {
  insertElementForActionSelector = '.project-header-search';

  getLists = (): IList[] => [];

  getCards = () => {
    const allCards = document.querySelectorAll('.project-card');
    return [...allCards].map((cardElement) => this.getCardDetails(cardElement));
  };

  getCardDetails = (cardElement: Element): ICard => {
    const githubCardDetails: GithubCardAttributes = [
      ...cardElement.attributes,
    ].reduce<any>((githubCardDetails, { name, value }: any) => {
      githubCardDetails[name] = value;
      return githubCardDetails;
    }, {});

    return {
      id: githubCardDetails['data-card-id'],
      href: 'https://github.com/' + githubCardDetails['data-url'],
      cardNumber: '',
      cardName: JSON.parse(githubCardDetails['data-card-title']).join(' '),
      labels: [],
      listName: githubCardDetails['data-column-id'],
      children: new Set(),
      dependencies: new Set(),
      cardElement,
    };
  };
}

console.info('[GRAPH DEP EXTENSION] :  injected github manager');
(window as any).cardManager = new GithubManager();
