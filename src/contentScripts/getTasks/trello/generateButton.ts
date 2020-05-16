import { customCreateElement } from '../../utils/customCreateElement';

export const generateButton = ({
  text,
  id,
  onClick,
}: {
  text: string;
  id: string;
  onClick: Function;
}) => {
  const button = customCreateElement('button', {
    innerHTML: text,
    className: `button-${id}`,
    id,
  });
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(id);
  });
  return button as HTMLButtonElement;
};
