import React, { useRef, useEffect } from 'react';
export const DependencyTag = ({
  card,
  onClose,
}: {
  card: ICard;
  onClose: (event: any) => void;
}) => {
  const tagRef = useRef();

  useEffect(() => {
    //@ts-ignore
    tagRef.current.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      onClose(e);
    });
  }, []);
  return (
    <div
      style={{ position: 'relative', width: 'fit-content' }}
      className='dependency-tag'
    >
      <a href={card.href}>{card.cardNumber}</a>
      <span ref={tagRef}>x</span>
    </div>
  );
};
