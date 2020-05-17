interface ICard {
  id?: string;
  cardElement?: Element;
  cardUrl: string;
  href: string;
  cardNumber: string;
  cardName: string;
  labels: Array<{
    classes: string;
    text: string;
  }>;
  button?: HTMLButtonElement;
  listName: string;
  children: Set<string>;
  dependencies: Set<string>;
}
