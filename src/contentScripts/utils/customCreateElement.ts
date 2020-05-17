import ReactDOM from 'react-dom';

interface CustomCreateElementInterface {
  className?: string;
  innerHTML?: string;
  id?: string;
}
export const customCreateElement = (
  elementType: 'div' | 'button',
  { className, innerHTML, id }: CustomCreateElementInterface,
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

export const ReactDOMAppendChild = (
  element: Element | JSX.Element,
  container: Node,
  options?: CustomCreateElementInterface & { insertAfter?: boolean },
) => {
  const divContainer = customCreateElement('div', options || {});
  divContainer.addEventListener('click', (e) => {
    e.preventDefault();
  });
  ReactDOM.render(element, divContainer);
  if (options?.insertAfter) {
    if (container.nextSibling) {
      container.parentElement.insertBefore(divContainer, container.nextSibling);
    } else {
      container.parentElement.appendChild(divContainer);
    }
  } else {
    container.appendChild(divContainer);
  }
};
