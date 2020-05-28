import './cyto.css';
import './buttons.css';
import cytoscape from 'cytoscape';
import cyCanvas from 'cytoscape-canvas';
import { drawingHelper } from './drawingHelper';
import { jsonStyle } from './createDependencyGraphStyle';
import { dependencyManager } from './dependencyManager';
import { CARD_WIDTH_WITH_SPACING } from './drawingHelper.constants';

cyCanvas(cytoscape); // Register extension

export function createDependencyGraph({
  nodes,
  edges,
}: {
  nodes: any;
  edges: any;
}) {
  let independantCardTransformed = 0;
  var cy = cytoscape({
    container: document.getElementById('cy'),
    boxSelectionEnabled: true,
    style: jsonStyle,
    elements: {
      nodes,
      edges,
    },
    layout: {
      name: 'breadthfirst',
      directed: true,
      padding: 40,
      spacingFactor: 1.1,
      maximal: true,
      transform: function (
        node: { data: () => ICard },
        position: { x: number; y: number },
      ) {
        let cardPosition = position;
        if (!node.data().children.size && !node.data().dependencies.size) {
          // Cas des cartes indépendantes
          cardPosition = {
            x:
              0 +
              Math.floor(independantCardTransformed / 2) *
                CARD_WIDTH_WITH_SPACING,
            y: 300 - Math.floor(independantCardTransformed % 2) * 200,
          };
          independantCardTransformed += 1;
        }
        return cardPosition;
      },
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
      } else {
        const edgesToAdd = selectedNodes.map((node: any) => {
          return {
            group: 'edges',
            data: dependencyManager.addDependency(
              selectedNode.data().id,
              node.data.id,
            ),
          };
        });
        cy.add(edgesToAdd);
      }
      //This line prevent the element to be selected if clicked with ctrlKey
      cy.$(`#${selectedNode.data().id}`).select();
    }
  });

  cy.on('tap', 'edge', function (evt: {
    target: any;
    originalEvent: MouseEvent;
  }) {
    const selectedEdge = evt.target;
    if (evt.originalEvent.ctrlKey) {
      dependencyManager.removeDependency(
        selectedEdge.data().source,
        selectedEdge.data().target,
      );
      selectedEdge.remove();
    }
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
  });

  const doubleClickDelayMs = 350;
  let previousTapStamp = 0;

  cy.on('tap', function (e) {
    var currentTapStamp = e.timeStamp;
    var msFromLastTap = currentTapStamp - previousTapStamp;

    if (msFromLastTap < doubleClickDelayMs) {
      e.target.trigger('doubleTap', e);
    }
    previousTapStamp = currentTapStamp;
  });

  cy.on('doubleTap', function () {
    // alert('double tap');
    reorderGraph();
  });

  const reorderGraph = () => {
    const parentNodes: Array<{ data: ICard }> = nodes.filter(
      (node) => node.data.children.size && !node.data.dependencies.size,
    );
    parentNodes.forEach((parentNode) => {
      const childrenNodePositions = [
        ...parentNode.data.children,
      ].map((childId) => cy.$id(childId).position('x'));
      const middlePosition =
        childrenNodePositions.reduce((final, cur) => final + cur, 0) /
        childrenNodePositions.length;
      cy.$id(parentNode.data.id).position('x', middlePosition);
    });
    cy.fit('', 40);
  };

  reorderGraph();
}
