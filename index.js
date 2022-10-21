import { registerFont, createCanvas } from 'canvas';
import { fileURLToPath } from 'node:url'
import { writeFile } from 'node:fs/promises'

const fontPath = fileURLToPath(new URL("./NotoSansKhmer.ttf", import.meta.url))
const fontFamily = "Noto Sans Khmer"
const fontSize = 48;
const text = 'Hello, word! សួស្ដី!'


console.time('load font');

registerFont(fontPath, {
  family: fontFamily,
  weight: 400,
  style: 'normal'
});

console.timeEnd('load font');

async function createImage(type, outputPath) {
  console.time('render ' + type)
  const canvasType = type === 'svg' ? type : undefined;
  const canvas = createCanvas(512, 512, canvasType);
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);  
  gradient.addColorStop(0, "#cfd9df");
  gradient.addColorStop(1, "#e2ebf0");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#333';
  ctx.font = `${fontSize}px ${fontFamily}`
  ctx.fillText(text, fontSize, fontSize * 2);
  ctx.fillText(`format: ${type}`, fontSize, fontSize * 4);

  const mime = type === 'svg' ? undefined : `image/${type}`;
  const buffer = canvas.toBuffer(mime, { quality: 1 });
  console.timeEnd('render ' + type);

  await writeFile(outputPath, buffer);
}

await Promise.all([
  createImage('jpeg', fileURLToPath(new URL("./image.jpg", import.meta.url))),
  createImage('png', fileURLToPath(new URL("./image.png", import.meta.url))),
  createImage('svg', fileURLToPath(new URL("./image.svg", import.meta.url))),
])
