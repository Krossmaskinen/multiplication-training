const fs = require('fs');
const path = require('path');

const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#2563eb" rx="100"/>
  <text x="256" y="320" font-family="Arial, sans-serif" font-size="280" font-weight="bold" text-anchor="middle" fill="white">×</text>
</svg>`;

const sizes = [192, 512];

sizes.forEach(size => {
  const svg = svgIcon.replace('512', size).replace('512', size).replace('280', (size * 0.55).toString());
  const outputPath = path.join(__dirname, '..', 'static', `icon-${size}.png`);
  
  console.log(`Note: This script generates SVG. You'll need to convert to PNG manually or use a tool like sharp/imagemagick.`);
  console.log(`For now, please create icon-${size}.png manually in the static folder.`);
});

console.log('\nTo create the PNG icons, you can:');
console.log('1. Use an online tool like https://realfavicongenerator.net/');
console.log('2. Use ImageMagick: convert icon.svg -resize 192x192 icon-192.png');
console.log('3. Use sharp (npm package) to programmatically convert SVG to PNG');

