import { BUTTON_TEXTS } from '../../shared/constants';
import { updateCardText } from './updateCardText';

export function resetCardText(cardsByCardUrl: Record<string, ICard>) {
  Object.values(cardsByCardUrl).forEach((card) =>
    updateCardText(card, BUTTON_TEXTS.ADD_DEPENDENCY),
  );
}
