export const jsonStyle = [
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
      'target-arrow-shape': 'triangle'
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
