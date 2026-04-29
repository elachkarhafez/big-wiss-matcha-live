const fs = require('fs');
const path = require('path');

// We'll create SVG files instead and convert them to PNG-like images
// Or we can use a simple approach with native canvas

const cupsDir = path.join(__dirname, 'public', 'product-cups');

// Create directory if it doesn't exist
if (!fs.existsSync(cupsDir)) {
  fs.mkdirSync(cupsDir, { recursive: true });
}

// Create SVG cup images
const cups = [
  {
    name: 'cup-1.png',
    title: 'Classic Matcha',
    type: 'classic',
    svgContent: `<svg width="300" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#6ba76b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#5a9566;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#6ba76b;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#7fb97f;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#6ba76b;stop-opacity:1" />
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="8" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Shadow -->
  <ellipse cx="150" cy="360" rx="85" ry="15" fill="rgba(0,0,0,0.15)"/>

  <!-- Cup body -->
  <path d="M 80 150 L 220 150 L 200 340 L 100 340 Z" fill="white" stroke="#ddd" stroke-width="2" filter="url(#shadow)"/>

  <!-- Cup rim -->
  <path d="M 80 150 L 220 150 L 215 145 L 85 145 Z" fill="#f5f5f5" stroke="#ddd" stroke-width="1"/>

  <!-- Liquid -->
  <path d="M 82 155 L 218 155 L 198 330 L 102 330 Z" fill="url(#liquidGrad)" opacity="0.95"/>

  <!-- Foam bubbles -->
  <circle cx="95" cy="165" r="3" fill="rgba(200,230,200,0.6)"/>
  <circle cx="110" cy="160" r="2.5" fill="rgba(200,230,200,0.5)"/>
  <circle cx="130" cy="162" r="2" fill="rgba(200,230,200,0.4)"/>
  <circle cx="150" cy="158" r="3.5" fill="rgba(200,230,200,0.6)"/>
  <circle cx="170" cy="161" r="2" fill="rgba(200,230,200,0.5)"/>
  <circle cx="190" cy="164" r="2.5" fill="rgba(200,230,200,0.5)"/>
  <circle cx="210" cy="159" r="2" fill="rgba(200,230,200,0.4)"/>

  <!-- Branding -->
  <text x="150" y="200" font-size="16" font-weight="bold" text-anchor="middle" fill="#2d5a3d">BIG WISS</text>
  <text x="150" y="220" font-size="14" text-anchor="middle" fill="#c4a57b">MATCHA</text>

  <!-- Straw -->
  <rect x="147" y="140" width="6" height="185" fill="#2d5a3d" rx="3"/>
  <rect x="144" y="140" width="2" height="185" fill="rgba(255,255,255,0.3)" rx="1"/>
</svg>`
  },
  {
    name: 'cup-2.png',
    title: 'Cream Top',
    type: 'creamtop',
    svgContent: `<svg width="300" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow">
      <feDropShadow dx="0" dy="8" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Shadow -->
  <ellipse cx="150" cy="360" rx="85" ry="15" fill="rgba(0,0,0,0.15)"/>

  <!-- Cup body -->
  <path d="M 80 150 L 220 150 L 200 340 L 100 340 Z" fill="white" stroke="#ddd" stroke-width="2" filter="url(#shadow)"/>

  <!-- Cup rim -->
  <path d="M 80 150 L 220 150 L 215 145 L 85 145 Z" fill="#f5f5f5" stroke="#ddd" stroke-width="1"/>

  <!-- Matcha liquid -->
  <path d="M 82 155 L 218 155 L 198 280 L 102 280 Z" fill="#6ba76b" opacity="0.95"/>

  <!-- Cream layer -->
  <path d="M 82 280 L 218 280 L 198 330 L 102 330 Z" fill="#f5e6d3" opacity="0.98"/>

  <!-- Cream texture spots -->
  <circle cx="100" cy="295" r="2" fill="rgba(255,255,255,0.6)"/>
  <circle cx="125" cy="290" r="1.5" fill="rgba(255,255,255,0.5)"/>
  <circle cx="150" cy="298" r="1.8" fill="rgba(255,255,255,0.5)"/>
  <circle cx="175" cy="292" r="1.5" fill="rgba(255,255,255,0.4)"/>
  <circle cx="200" cy="300" r="2" fill="rgba(255,255,255,0.6)"/>
  <circle cx="140" cy="312" r="1.5" fill="rgba(255,255,255,0.5)"/>
  <circle cx="165" cy="310" r="1.5" fill="rgba(255,255,255,0.4)"/>

  <!-- Branding -->
  <text x="150" y="200" font-size="16" font-weight="bold" text-anchor="middle" fill="#2d5a3d">BIG WISS</text>
  <text x="150" y="220" font-size="14" text-anchor="middle" fill="#c4a57b">MATCHA</text>

  <!-- Straw -->
  <rect x="147" y="140" width="6" height="185" fill="#2d5a3d" rx="3"/>
  <rect x="144" y="140" width="2" height="185" fill="rgba(255,255,255,0.3)" rx="1"/>
</svg>`
  },
  {
    name: 'cup-3.png',
    title: 'Boba Matcha',
    type: 'boba',
    svgContent: `<svg width="300" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow">
      <feDropShadow dx="0" dy="8" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Shadow -->
  <ellipse cx="150" cy="360" rx="85" ry="15" fill="rgba(0,0,0,0.15)"/>

  <!-- Cup body -->
  <path d="M 80 150 L 220 150 L 200 340 L 100 340 Z" fill="white" stroke="#ddd" stroke-width="2" filter="url(#shadow)"/>

  <!-- Cup rim -->
  <path d="M 80 150 L 220 150 L 215 145 L 85 145 Z" fill="#f5f5f5" stroke="#ddd" stroke-width="1"/>

  <!-- Matcha liquid -->
  <path d="M 82 155 L 218 155 L 198 330 L 102 330 Z" fill="#6ba76b" opacity="0.95"/>

  <!-- Boba pearls -->
  <circle cx="110" cy="280" r="5" fill="#3d2817" opacity="0.9"/>
  <circle cx="110" cy="280" r="2" fill="rgba(255,255,255,0.3)"/>

  <circle cx="135" cy="295" r="6" fill="#3d2817" opacity="0.9"/>
  <circle cx="135" cy="295" r="2.5" fill="rgba(255,255,255,0.3)"/>

  <circle cx="160" cy="285" r="5.5" fill="#3d2817" opacity="0.9"/>
  <circle cx="160" cy="285" r="2" fill="rgba(255,255,255,0.3)"/>

  <circle cx="185" cy="305" r="6" fill="#3d2817" opacity="0.9"/>
  <circle cx="185" cy="305" r="2.5" fill="rgba(255,255,255,0.3)"/>

  <circle cx="125" cy="315" r="5" fill="#3d2817" opacity="0.9"/>
  <circle cx="125" cy="315" r="2" fill="rgba(255,255,255,0.3)"/>

  <circle cx="175" cy="320" r="5.5" fill="#3d2817" opacity="0.9"/>
  <circle cx="175" cy="320" r="2" fill="rgba(255,255,255,0.3)"/>

  <circle cx="145" cy="310" r="5" fill="#3d2817" opacity="0.9"/>
  <circle cx="145" cy="310" r="2" fill="rgba(255,255,255,0.3)"/>

  <circle cx="190" cy="275" r="5" fill="#3d2817" opacity="0.9"/>
  <circle cx="190" cy="275" r="2" fill="rgba(255,255,255,0.3)"/>

  <!-- Branding -->
  <text x="150" y="200" font-size="16" font-weight="bold" text-anchor="middle" fill="#2d5a3d">BIG WISS</text>
  <text x="150" y="220" font-size="14" text-anchor="middle" fill="#c4a57b">MATCHA</text>

  <!-- Straw -->
  <rect x="147" y="140" width="6" height="185" fill="#2d5a3d" rx="3"/>
  <rect x="144" y="140" width="2" height="185" fill="rgba(255,255,255,0.3)" rx="1"/>
</svg>`
  },
  {
    name: 'cup-4.png',
    title: 'Iced Matcha',
    type: 'iced',
    svgContent: `<svg width="300" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow">
      <feDropShadow dx="0" dy="8" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Shadow -->
  <ellipse cx="150" cy="360" rx="85" ry="15" fill="rgba(0,0,0,0.15)"/>

  <!-- Cup body -->
  <path d="M 80 150 L 220 150 L 200 340 L 100 340 Z" fill="white" stroke="#ddd" stroke-width="2" filter="url(#shadow)"/>

  <!-- Cup rim -->
  <path d="M 80 150 L 220 150 L 215 145 L 85 145 Z" fill="#f5f5f5" stroke="#ddd" stroke-width="1"/>

  <!-- Matcha liquid -->
  <path d="M 82 155 L 218 155 L 198 290 L 102 290 Z" fill="#6ba76b" opacity="0.95"/>

  <!-- Ice cubes -->
  <rect x="115" y="260" width="15" height="15" fill="rgba(200,240,255,0.6)" stroke="rgba(100,200,255,0.4)" stroke-width="1"/>
  <rect x="140" y="275" width="18" height="18" fill="rgba(200,240,255,0.6)" stroke="rgba(100,200,255,0.4)" stroke-width="1"/>
  <rect x="165" y="265" width="16" height="16" fill="rgba(200,240,255,0.6)" stroke="rgba(100,200,255,0.4)" stroke-width="1"/>
  <rect x="125" y="290" width="14" height="14" fill="rgba(200,240,255,0.6)" stroke="rgba(100,200,255,0.4)" stroke-width="1"/>
  <rect x="175" y="285" width="15" height="15" fill="rgba(200,240,255,0.6)" stroke="rgba(100,200,255,0.4)" stroke-width="1"/>
  <rect x="150" y="305" width="16" height="16" fill="rgba(200,240,255,0.6)" stroke="rgba(100,200,255,0.4)" stroke-width="1"/>

  <!-- Water droplets on cup -->
  <circle cx="95" cy="165" r="3" fill="rgba(100,200,255,0.3)"/>
  <circle cx="215" cy="175" r="2.5" fill="rgba(100,200,255,0.3)"/>
  <circle cx="100" cy="185" r="2" fill="rgba(100,200,255,0.25)"/>
  <circle cx="210" cy="200" r="2.5" fill="rgba(100,200,255,0.3)"/>

  <!-- Branding -->
  <text x="150" y="200" font-size="16" font-weight="bold" text-anchor="middle" fill="#2d5a3d">BIG WISS</text>
  <text x="150" y="220" font-size="14" text-anchor="middle" fill="#c4a57b">MATCHA</text>

  <!-- Straw -->
  <rect x="147" y="140" width="6" height="185" fill="#2d5a3d" rx="3"/>
  <rect x="144" y="140" width="2" height="185" fill="rgba(255,255,255,0.3)" rx="1"/>
</svg>`
  },
  {
    name: 'cup-5.png',
    title: 'Strawberry Matcha',
    type: 'strawberry',
    svgContent: `<svg width="300" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow">
      <feDropShadow dx="0" dy="8" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Shadow -->
  <ellipse cx="150" cy="360" rx="85" ry="15" fill="rgba(0,0,0,0.15)"/>

  <!-- Cup body -->
  <path d="M 80 150 L 220 150 L 200 340 L 100 340 Z" fill="white" stroke="#ddd" stroke-width="2" filter="url(#shadow)"/>

  <!-- Cup rim -->
  <path d="M 80 150 L 220 150 L 215 145 L 85 145 Z" fill="#f5f5f5" stroke="#ddd" stroke-width="1"/>

  <!-- Matcha liquid (top layer) -->
  <path d="M 82 155 L 218 155 L 198 270 L 102 270 Z" fill="#6ba76b" opacity="0.95"/>

  <!-- Strawberry liquid (bottom layer) -->
  <path d="M 82 270 L 218 270 L 198 330 L 102 330 Z" fill="#e74c3c" opacity="0.9"/>

  <!-- Layer separation shine -->
  <line x1="85" y1="270" x2="215" y2="270" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>

  <!-- Strawberry layer shimmer -->
  <circle cx="110" cy="290" r="3" fill="rgba(255,100,100,0.3)"/>
  <circle cx="140" cy="300" r="2.5" fill="rgba(255,100,100,0.3)"/>
  <circle cx="170" cy="295" r="2" fill="rgba(255,100,100,0.25)"/>
  <circle cx="200" cy="305" r="2.5" fill="rgba(255,100,100,0.3)"/>
  <circle cx="155" cy="315" r="2" fill="rgba(255,100,100,0.25)"/>
  <circle cx="130" cy="320" r="2.5" fill="rgba(255,100,100,0.3)"/>

  <!-- Branding -->
  <text x="150" y="200" font-size="16" font-weight="bold" text-anchor="middle" fill="#2d5a3d">BIG WISS</text>
  <text x="150" y="220" font-size="14" text-anchor="middle" fill="#c4a57b">MATCHA</text>

  <!-- Straw -->
  <rect x="147" y="140" width="6" height="185" fill="#2d5a3d" rx="3"/>
  <rect x="144" y="140" width="2" height="185" fill="rgba(255,255,255,0.3)" rx="1"/>
</svg>`
  }
];

// Convert SVG to simple PNG-like format by saving as SVG first
cups.forEach((cup) => {
  const svgPath = path.join(cupsDir, cup.name.replace('.png', '.svg'));
  fs.writeFileSync(svgPath, cup.svgContent);
  console.log(`✓ Created ${cup.name}`);
});

console.log('\n✅ All cup images created!');
console.log('SVG files saved. You can convert them to PNG using an online converter or image editor.');
console.log('Path: public/product-cups/');
