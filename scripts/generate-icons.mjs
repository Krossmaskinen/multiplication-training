import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const svgIcon = (size) => `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#2563eb" rx="${size * 0.2}"/>
  <text x="${size / 2}" y="${size * 0.65}" font-family="Arial, sans-serif" font-size="${size * 0.55}" font-weight="bold" text-anchor="middle" fill="white">×</text>
</svg>`;

const sizes = [192, 512];

async function generateIcons() {
  for (const size of sizes) {
    const svg = svgIcon(size);
    const outputPath = join(__dirname, '..', 'static', `icon-${size}.png`);
    
    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);
    
    console.log(`Generated icon-${size}.png`);
  }
  
  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);

