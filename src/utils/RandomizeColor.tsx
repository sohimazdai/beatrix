import { COLOR } from '../constant/Color';

interface RGB {
  r: number,
  g: number,
  b: number,
}

export const randomizeColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

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
  return average > 128
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
  return Math.floor(Math.random() * 256);
}
