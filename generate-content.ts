import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadContentSections } from './src/lib/utils.js';

// Get the directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate content data
const contentPath = path.resolve(__dirname, 'content');
const outputPath = path.resolve(__dirname, 'src/lib/content-data.json');

try {
  const sections = loadContentSections(contentPath);
  fs.writeFileSync(outputPath, JSON.stringify(sections, null, 2));
  console.log('Content data generated successfully');
} catch (error: any) {
  console.error('Error generating content data:', error);
}
