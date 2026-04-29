const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Convert JPG images to PNG with proper transparency handling
const cupsDir = path.join(__dirname, 'public', 'product-cups');

const convertImage = async (filename, index) => {
  const inputPath = path.join(cupsDir, filename);
  const outputPath = path.join(cupsDir, `cup-${index + 1}.png`);

  try {
    // Convert JPG to PNG with proper transparency
    await sharp(inputPath)
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(outputPath);

    console.log(`✓ Converted ${filename} to PNG`);

    // Optionally delete the original JPG
    if (fs.existsSync(inputPath) && inputPath.endsWith('.jpg')) {
      fs.unlinkSync(inputPath);
      console.log(`  Removed original JPG`);
    }
  } catch (error) {
    console.error(`Error converting ${filename}:`, error.message);
  }
};

// Process all cup images
const files = ['cup-1.jpg', 'cup-2.jpg', 'cup-3.jpg', 'cup-4.jpg', 'cup-5.jpg'];

(async () => {
  for (let i = 0; i < files.length; i++) {
    await convertImage(files[i], i);
  }
  console.log('\n✅ All images converted to PNG!');
  console.log('Update hero.tsx to use .png extension instead of .jpg');
})();
