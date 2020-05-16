export const customCreateElement = (
  elementType: 'div' | 'button',
  {
    className,
    innerHTML,
    id,
  }: {
    className?: string;
    innerHTML?: string;
    id?: string;
  },
) => {
  const element = document.createElement(elementType);
  element.setAttribute('class', `div-graph-dep-action ${className}`);
  if (id) {
    element.id = id;
  }
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  return element;
};
