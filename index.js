import { registerFont, createCanvas } from 'canvas';
import { fileURLToPath } from 'node:url'
import { writeFile } from 'node:fs/promises'

const fontPath = fileURLToPath(new URL("./NotoSansKhmer.ttf", import.meta.url))
const fontFamily = "Noto Sans Khmer"
const fontSize = 48;
const text = 'Hello, word! សួស្ដី!'

registerFont(fontPath, {
  family: fontFamily,
  weight: 400,
  style: 'normal'
});

async function createImage(type, outputPath) {
  const canvasType = type === 'svg' ? type : undefined;
  const canvas = createCanvas(512, 512, canvasType);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#eee';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000';
  ctx.font = `${fontSize}px ${fontFamily}`
  ctx.fillText(text, fontSize, fontSize * 2);
  ctx.fillText(`format: ${type}`, fontSize, fontSize * 4);

  const mime = type === 'svg' ? undefined : `image/${type}`;
  const buffer = canvas.toBuffer(mime)
  await writeFile(outputPath, buffer);
}

await Promise.all([
  createImage('svg', fileURLToPath(new URL("./image.svg", import.meta.url))),
  createImage('png', fileURLToPath(new URL("./image.png", import.meta.url))),
  createImage('jpeg', fileURLToPath(new URL("./image.jpg", import.meta.url)))
])

