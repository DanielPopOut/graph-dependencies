import React from 'react';
export const DependencyTag = ({
  card,
  onClose,
}: {
  card: ICard;
  onClose: (event: any) => void;
}) => {
  return (
    <div
      style={{ position: 'relative', width: 'fit-content' }}
      className='dependency-tag'
    >
      <a href={card.href}>{card.cardNumber}</a>
      <span onClick={onClose}>x</span>
    </div>
  );
};
