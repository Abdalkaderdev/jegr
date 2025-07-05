// add-img-dimensions.cjs
// Usage: node add-img-dimensions.cjs
// Requires: npm install image-size

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const sizeOf = require('image-size');

const SRC_DIR = path.join(__dirname, 'src');
const ASSETS_DIR = path.join(SRC_DIR, 'assets');

// Find all .tsx and .jsx files
const files = glob.sync(path.join(SRC_DIR, '**/*.{tsx,jsx}'));

files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Regex to find <img ...> tags with src={...} or src="..."
  const imgTagRegex = /<img([^>]*?)src={(require\(['"](\.\.\/assets\/[^'"]+)['"]\))|['"](\.\.\/assets\/[^'"]+)['"]}([^>]*)>/g;
  const imgTagRegex2 = /<img([^>]*?)src={[ ]*([a-zA-Z0-9_]+)[ ]*}([^>]*)>/g;
  const imgTagRegex3 = /<img([^>]*?)src=["'](\.\.\/assets\/[^"']+)["']([^>]*)>/g;
  const imgTagRegex4 = /<img([^>]*?)src={[ ]*([a-zA-Z0-9_]+)[ ]*}([^>]*)>/g;

  // Also handle imports at the top: import foo from '../assets/foo.png';
  const importRegex = /import\s+([a-zA-Z0-9_]+)\s+from\s+['"]\.\.\/assets\/([^'"]+)['"]/g;
  const imports = {};
  let match;
  while ((match = importRegex.exec(content))) {
    imports[match[1]] = match[2];
  }

  // Replace <img src={foo} ...> with width/height if missing
  content = content.replace(/<img([^>]*?)src={[ ]*([a-zA-Z0-9_]+)[ ]*}([^>]*)>/g, (tag, before, varName, after) => {
    if (!imports[varName]) return tag; // Not a local asset
    const assetPath = path.join(ASSETS_DIR, imports[varName]);
    if (!fs.existsSync(assetPath)) return tag;
    const { width, height } = sizeOf(assetPath);
    if (tag.includes('width=') || tag.includes('height=')) return tag; // Already has
    changed = true;
    return `<img${before}src={${varName}} width={${width}} height={${height}}${after}>`;
  });

  // Replace <img src="../assets/foo.png" ...> with width/height if missing
  content = content.replace(/<img([^>]*?)src=["']\.\.\/assets\/([^"']+)["']([^>]*)>/g, (tag, before, asset, after) => {
    const assetPath = path.join(ASSETS_DIR, asset);
    if (!fs.existsSync(assetPath)) return tag;
    const { width, height } = sizeOf(assetPath);
    if (tag.includes('width=') || tag.includes('height=')) return tag; // Already has
    changed = true;
    return `<img${before}src={require('../assets/${asset}')} width={${width}} height={${height}}${after}>`;
  });

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
});

console.log('Done.'); 