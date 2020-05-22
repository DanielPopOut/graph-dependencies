export const jsonStyle = [
  {
    selector: 'node',
    style: {
      height: 'data(height)',
      width: 200,
      shape: 'rectangle',
      'background-opacity': '0',
    },
  },
  {
    selector: 'edge',
    style: {
      'curve-style': 'bezier',
        width: 4,
      'target-arrow-shape': 'triangle',
    },
  },
  {
    selector: 'edge:selected',
    style: {
      'curve-style': 'bezier',
      width: 6,
      'target-arrow-shape': 'triangle',
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
