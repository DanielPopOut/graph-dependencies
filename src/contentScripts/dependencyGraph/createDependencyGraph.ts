import './cyto.css';
import './buttons.css';

declare var cytoscape: any;
declare var $: any;

export function createDependencyGraph(
  cardDependancies: Record<string, CardDependency>,
  cardsByCardUrl: Record<string, ICard>,
) {
  console.log(cardDependancies, cardsByCardUrl);
  const allCards = Object.values(cardDependancies);
  // photos from flickr with creative commons license
  $('#cy').remove();
  const div = document.createElement('div');
  div.id = 'cy';
  const closeDiv = document.createElement('div');
  closeDiv.innerHTML = 'Fermer';
  closeDiv.classList.add('close-button');
  closeDiv.addEventListener('click', (e) => {
    $('#cy').remove();
  });
  div.append(closeDiv);

  $('body').append(div);

  console.log('calculated', {
    nodes: allCards.map((card) => ({ data: { id: card.cardUrl } })),
    edges: allCards.reduce((final, card) => {
      final.push(
        ...card.children.map((childCardID) => ({
          data: {
            source: card.cardUrl,
            target: cardDependancies[childCardID].cardUrl,
          },
        })),
      );
      return final;
    }, []),
  });

  const nodes = allCards.map((card) => {
    const completeCard = cardsByCardUrl[card.cardUrl];
    console.log(
      decodeURI(
        [
          completeCard.cardNumber,
          (completeCard.cardName as any).join(' '),
        ].join(' '),
      ),
    );
    return {
      data: {
        id: card.cardUrl,
        ...completeCard,
        label: decodeURI(
          [
            completeCard.cardNumber,
            (completeCard.cardName as any).join(' '),
          ].join(' '),
        ),
        // .replace(/(?!$|\n)([^\n]{32}(?!\n))/g, '$1\n'),
      },
      classes: 'center-center',
    };
  });

  var cy = cytoscape({
    container: document.getElementById('cy'),

    boxSelectionEnabled: false,
    autounselectify: true,

    style: jsonStyle,

    elements: {
      nodes,
      edges: allCards.reduce((final, card) => {
        final.push(
          ...card.children.map((childCardID) => ({
            data: {
              source: card.cardUrl,
              target: cardDependancies[childCardID].cardUrl,
            },
          })),
        );
        return final;
      }, []),
    },

    layout: {
      name: 'concentric',
      directed: true,
      padding: 40,
    },
  }); // cy init

  cy.on('tap', 'node', function (evt: any) {
    var node = evt.target;
    console.log('tapped ' + node.id());
  });
}

const jsonStyle = [
  {
    selector: 'node',
    style: {
      height: 150,
      width: 255,
      shape: 'rectangle',
      'background-color': '#fff',
      'border-radius': '3px',
      // 'background-image':
      //   'https://cdn.rawgit.com/mafar/svg-test/9d252c09/dropshadow.svg',
    },
  },
  {
    selector: 'edge',
    style: {
      'curve-style': 'bezier',
      width: 6,
      'target-arrow-shape': 'triangle',
      'line-color': '#000000',
      'target-arrow-color': '#000000',
    },
  },
  {
    selector: 'center-center',
    style: {
      'text-valign': 'center',
      'text-halign': 'center',
    },
  },
  {
    selector: 'node[label]',
    style: {
      label: 'data(label)',
      'text-wrap': 'wrap',
      'text-max-width': 250,
      'font-weight': 700,
      'font-size': 24,
    },
  },
  {
    selector: 'node::grabbed',
    style: {
      background: '#be0',
    },
  },
  {
    selector: 'node:selected',
    style: {
      'background-color': '#d67614',
      'target-arrow-color': '#000',
      'text-outline-color': '#000',
    },
  },
  {
    selector: 'node:active',
    style: {
      'overlay-color': '#b0a',
      'overlay-padding': '14',
    },
  },
];
