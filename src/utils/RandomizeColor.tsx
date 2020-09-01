import { COLOR } from '../constant/Color';

const OFFSET = 20;
const RGB_COLOR_VALUE_MAX = 256;

interface RGB {
  r: number,
  g: number,
  b: number,
}

export const randomizeColor = () => {
  const red = Math.floor(Math.random() * RGB_COLOR_VALUE_MAX);
  const green = Math.floor(Math.random() * RGB_COLOR_VALUE_MAX);
  const blue = Math.floor(Math.random() * RGB_COLOR_VALUE_MAX);

  return `rgb(${red}, ${green}, ${blue})`;
}

export const randomizeBGandFontColor = (): { bgColor: string, color: string } => {
  const bgColor = getRGB();
  const isBgLight = isRgbLight(bgColor);

  let fontColor = COLOR.TEXT_WHITE;

  if (isBgLight) fontColor = COLOR.TEXT_BLACK;

  return {
    bgColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
    color: fontColor,
  };
};

function isRgbLight(rgb: RGB) {
  let average = (rgb.r + rgb.g + rgb.b) / 3;
  return average > (RGB_COLOR_VALUE_MAX / 2)
    ? true
    : false;
}

function getRGB(): RGB {
  const red = getRandomRGB();
  const green = getRandomRGB();
  const blue = getRandomRGB();

  return { r: red, g: green, b: blue };
}

function getRandomRGB(): number {
  const randomColor = Math.floor(Math.random() * RGB_COLOR_VALUE_MAX);

  const smoothedColor = randomColor > 200
    ? randomColor - OFFSET
    : randomColor < OFFSET
      ? randomColor + OFFSET
      : randomColor;

  const contrastedColor = smoothedColor > (RGB_COLOR_VALUE_MAX / 2 - OFFSET)
    ? smoothedColor - OFFSET
    : smoothedColor < (RGB_COLOR_VALUE_MAX / 2 + OFFSET)
      ? smoothedColor + OFFSET
      : smoothedColor;

  return contrastedColor;
}
