/**
 * Content generation script for Echoes of the Deep
 * 
 * This script processes markdown files from the content directory and converts them
 * into a structured JSON format that can be used by the application at runtime.
 * 
 * The script is designed to be run manually or as part of the build process.
 * It reads content from the 'content/' directory and outputs processed data to
 * 'src/lib/content-data.json'.
 * 
 * Usage:
 *   bun run generate-content.ts
 * 
 * This script should be run whenever content files are added, modified, or removed
 * to ensure the application has up-to-date content data.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadContentSections } from './src/lib/utils.js';

// Get the directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Define paths for content source and output destination
 * 
 * - contentPath: Path to the content directory containing markdown files
 * - outputPath: Path where the generated JSON data will be written
 */
const contentPath = path.resolve(__dirname, 'content');
const outputPath = path.resolve(__dirname, 'src/lib/content-data.json');

try {
  // Load content sections from the content directory
  const sections = loadContentSections(contentPath);
  
  // Write the processed content data to JSON file
  fs.writeFileSync(outputPath, JSON.stringify(sections, null, 2));
  console.log('Content data generated successfully');
} catch (error: any) {
  // Log any errors that occur during content generation
  console.error('Error generating content data:', error);
}