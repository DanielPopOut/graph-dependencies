export function getTextWidth(text: string, font: string) {
  // re-use canvas object for better performance
  //@ts-ignore
  var canvas: any =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement('canvas'));
  var context: any = canvas.getContext('2d');
  context.font = font;
  var metrics: any = context.measureText(text);
  return metrics.width;
}

export const calculateCardHeight = (
  card: ICard,
  maxWidth: number = 200,
  firstLinePadding: number = 50,
) => {
  const text = card.cardName;
  let words = text.split(' ');
  let line = '';
  let isFirstLine = true;
  let linesNumber = 1;

  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let testWidth = getTextWidth(testLine, '18px Helvetica');
    if (
      testWidth >
        (isFirstLine && firstLinePadding
          ? maxWidth - firstLinePadding
          : maxWidth) &&
      n > 0
    ) {
      line = words[n] + ' ';
      isFirstLine = false;
      linesNumber += 1;
    } else {
      line = testLine;
    }
  }
  return (linesNumber + (card.labels.length ? 1 : 0)) * 18 * 1.3 + 16;
};
