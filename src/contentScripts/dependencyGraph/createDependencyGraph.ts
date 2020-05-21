import './cyto.css';
import './buttons.css';
import cytoscape from 'cytoscape';
import cyCanvas from 'cytoscape-canvas';
import { drawingHelper } from './drawingHelper';
import { jsonStyle } from './createDependencyGraphStyle';

cyCanvas(cytoscape); // Register extension

export function createDependencyGraph({
  nodes,
  edges,
}: {
  nodes: any;
  edges: any;
}) {
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
      cy.$(`#${selectedNode.data().id}`).select();
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
  });
}
