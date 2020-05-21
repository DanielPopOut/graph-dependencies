import './cyto.css';
import './buttons.css';
import cytoscape from 'cytoscape';
import cyCanvas from 'cytoscape-canvas';
import { drawingHelper } from './drawingHelper';

cyCanvas(cytoscape); // Register extension

export function createDependencyGraph(
  cardDependancies: Record<string, CardDependency>,
  cardsByCardUrl: Record<string, ICard>,
) {
  console.log(cardDependancies, cardsByCardUrl);
  const allCards = Object.values(cardDependancies);
  // photos from flickr with creative commons license
  document.querySelector('#cy')?.remove();
  const div = document.createElement('div');
  div.id = 'cy';
  const closeDiv = document.createElement('div');
  closeDiv.innerHTML = 'Fermer';
  closeDiv.classList.add('close-button');
  closeDiv.addEventListener('click', (e) => {
    document.querySelector('#cy').remove();
  });
  div.append(closeDiv);

  document.querySelector('body').append(div);

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
  }, cardsByCardUrl);

  const nodes = allCards.map((card) => {
    const completeCard = cardsByCardUrl[card.cardUrl];
    return {
      data: {
        id: card.cardUrl,
        ...completeCard,
        cardName: decodeURI(completeCard.cardName),
        label: decodeURI(
          [completeCard.cardNumber, completeCard.cardName].join(' '),
        ),
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
      name: 'breadthfirst',
      directed: true,
      padding: 40,
    },
  }); // cy init

  const bottomLayer = cy.cyCanvas({
    zIndex: 1,
  });
  const canvas = bottomLayer.getCanvas();
  const ctx = canvas.getContext('2d');

  cy.on('tap', 'node', function (evt: any) {
    var node = evt.target;
    // node.data();
    node.data().cardNumber= '15';
    console.log('tapped ' + node.id(), node, node?.data());
  });

  cy.on('render cyCanvas.resize', (evt: any) => {
    bottomLayer.resetTransform(ctx);
    bottomLayer.clear(ctx);
    bottomLayer.setTransform(ctx);

    ctx.save();

    // Draw shadows under nodes
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'rgba(9,30,66,.25)'
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 1;
    ctx.fillStyle = 'white';
    cy.nodes().forEach((node: any) => {
      const { x, y } = node.position();
      ctx.beginPath();
      drawingHelper.drawCard(x, y, node.data(), ctx);
    });
    ctx.restore();

    // Draw text that is fixed in the canvas
    bottomLayer.resetTransform(ctx);
    ctx.save();
    ctx.restore();
  });
}

const jsonStyle = [
  {
    selector: 'node',
    style: {
      height: 50,
      width: 200,
      shape: 'rectangle',
      'background-opacity': '0',
      'border-radius': '3px',
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
    selector: 'node::grabbed',
    style: {
      background: 'red',
    },
  },
  {
    selector: 'node:selected',
    style: {
      'background-color': 'blue',
      'target-arrow-color': '#000',
      'text-outline-color': '#000',
    },
  },
  {
    selector: 'node:active',
    style: {
      'overlay-color': 'red',
      'overlay-padding': '14',
    },
  },
];
