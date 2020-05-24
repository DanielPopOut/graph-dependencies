import { COLOR_USAGES, TRELLO_LABEL_COLORS } from './drawingHelper.constants';
import { getTextWidth } from './textWidthHelper';

class DrawingHelper {
  roundRect = ({
    x,
    y,
    w,
    h,
    radius,
    ctx,
    color = '#ffffff',
    text,
    shadow = 'black',
    padding = 0,
    fontColor,
  }: {
    x: number;
    y: number;
    w: number;
    h: number;
    radius: number;
    ctx: any;
    color?: string;
    text?: string;
    shadow?: string;
    padding?: number;
    fontColor?: string;
  }) => {
    var r = x + w;
    var b = y + h;
    ctx.beginPath();
    // ctx.strokeStyle = 'green';
    ctx.fillStyle = color;
    ctx.font = '10px';
    const roundedRectangle = new Path2D(
      `M${x},${y} h${w} a3,3 0 0 1 3,3 v${h} a3,3 0 0 1 -3,3 h-${w} a3,3 0 0 1 -3,-3 v-${h}  a3,3 0 0 1 3,-3 z`,
    );

    ctx.shadowColor = shadow;
    // ctx.stroke(roundedRectangle);
    ctx.fill(roundedRectangle);

    if (text) {
      ctx.shadowColor = 'transparent';
      ctx.fillStyle = fontColor || 'black';
      ctx.font = `${h}px Helvetica`;
      ctx.fillText(text, x + padding, y + h);
    }
  };
  drawCard = (x: number, y: number, data: ICard, ctx: any) => {
    const fontSize = 18;
    ctx.font = `${fontSize}px Helvetica`;
    const padding = 16;
    const w = 200;
    const numberOfTextLines = this.calculateNumberOfLines(
      ctx,
      data.cardName,
      w,
      50,
    );
    const cardHasLabels = !!data.labels.length;
    const h = fontSize * (numberOfTextLines + (cardHasLabels ? 1 : 0)) * 1.25;
    const [topLeftX, topLeftY] = [x - w / 2, y - h / 2];
    const textBeginingY = topLeftY + (cardHasLabels ? fontSize * 1.6 : 0);

    this.roundRect({
      x: topLeftX - padding,
      y: topLeftY - padding,
      w: w + 2 * padding,
      h: h + 2 * padding,
      radius: 6,
      ctx: ctx,
    });
    this.drawCardNumber({
      x: topLeftX,
      y: textBeginingY,
      cardNumber: '#' + data.cardNumber,
      ctx,
      fontSize,
    });
    this.wrapText(
      ctx,
      data.cardName,
      topLeftX,
      textBeginingY + fontSize,
      w,
      fontSize * 1.3,
      50,
    );
    if (cardHasLabels) {
      const padding = 4;
      let nextX = topLeftX;
      data.labels.map((label, index) => {
        const labelWidth = getTextWidth(label.text, '16px Helvetica');
        this.roundRect({
          x: nextX,
          y: topLeftY,
          text: label.text,
          ctx,
          w: labelWidth + 2 * padding,
          h: fontSize * 0.8,
          // @ts-ignore
          color: TRELLO_LABEL_COLORS[label.color],
          shadow: 'transparent',
          radius: 4,
          padding,
          fontColor: '#fff',
        });
        nextX += labelWidth + 10 + 2 * padding;
      });
    }
    if (data.members) {
      ctx.font = '45px Helvetica';
      ctx.fillStyle = 'black';
      data.members.map((memberInitials) => {
        ctx.fillText(memberInitials, topLeftX + w, topLeftY);
      });
    }
  };
  drawCardNumber = ({
    x,
    y,
    cardNumber,
    ctx,
    fontSize,
    color,
  }: {
    x: number;
    y: number;
    cardNumber: string;
    ctx: any;
    fontSize: number;
    color?: string;
  }) => {
    this.roundRect({
      x: x,
      y: y,
      w: (fontSize * ((cardNumber && cardNumber.length) || 1) * 2) / 3,
      h: fontSize,
      radius: 4,
      ctx: ctx,
      color: COLOR_USAGES.cardNumberBackground,
      text: cardNumber,
      shadow: 'transparent',
    });
  };

  wrapText = (
    ctx: any,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    firstLinePadding: number = 0,
  ) => {
    let words = text.split(' ');
    let line = '';
    let isFirstLine = true;

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (
        testWidth >
          (isFirstLine && firstLinePadding
            ? maxWidth - firstLinePadding
            : maxWidth) &&
        n > 0
      ) {
        ctx.fillText(line, isFirstLine ? x + firstLinePadding : x, y);
        line = words[n] + ' ';
        y += lineHeight;
        isFirstLine = false;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, isFirstLine ? x + firstLinePadding : x, y);
  };

  calculateNumberOfLines = (
    ctx: any,
    text: string,
    maxWidth: number,
    firstLinePadding: number = 0,
  ) => {
    let words = text.split(' ');
    let line = '';
    let isFirstLine = true;
    let linesNumber = 1;

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
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
    return linesNumber;
  };
}

export const drawingHelper = new DrawingHelper();
