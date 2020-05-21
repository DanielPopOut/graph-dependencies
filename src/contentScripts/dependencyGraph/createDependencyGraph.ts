import './cyto.css';
import './buttons.css';
import cytoscape from 'cytoscape';
import cyCanvas from 'cytoscape-canvas';
import { drawingHelper } from './drawingHelper';
import { calculateCardHeight } from './textWidthHelper';

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

  const nodes = allCards.map((card) => {
    const completeCard = cardsByCardUrl[card.cardUrl];
    return {
      data: {
        id: completeCard.id,
        ...completeCard,
        cardName: decodeURI(completeCard.cardName),
        label: decodeURI(
          [completeCard.cardNumber, completeCard.cardName].join(' '),
        ),
        height: calculateCardHeight(completeCard.cardName),
      },
      classes: 'center-center',
    };
  });

  var cy = cytoscape({
    container: document.getElementById('cy'),
    boxSelectionEnabled: true,

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

  cy.on('tap', 'node', function (evt: {
    target: any;
    originalEvent: MouseEvent;
  }) {
    const selectedNode = evt.target;
    // node.data();
    if (evt.originalEvent.ctrlKey) {
      const selectedNodes = cy.$(':selected').jsons();
      if (!selectedNodes.length) {
        alert(
          'You have to select at least one card to create a dependency with ctrl+click',
        );
      }
      // cy.$(`#${selectedNode.data().id}`).select();
    }

    console.log(
      'tapped ' + selectedNode.id(),
      evt,
      selectedNode.selected(),
      selectedNode.selectable(),
      selectedNode,
      selectedNode?.data(),
    );
  });

  cy.on('render cyCanvas.resize', (evt: any) => {
    bottomLayer.resetTransform(ctx);
    bottomLayer.clear(ctx);
    bottomLayer.setTransform(ctx);

    ctx.save();

    // Draw shadows under nodes
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'rgba(9,30,66,.25)';
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
      height: 'data(height)',
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
      'background-opacity': '0.5',
      width: 230,
      height: 'data(height)',
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
