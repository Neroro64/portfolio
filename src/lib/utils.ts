import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import type { PortfolioItem } from '$types/index';
import { fileURLToPath } from 'url';

// Get the directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Read and parse a markdown file with frontmatter
 */
export function readMarkdownFile(filePath: string): PortfolioItem {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  return {
    id: path.basename(filePath, path.extname(filePath)),
    title: data.title || '',
    description: data.description || '',
    type: data.type || 'project',
    date: data.date || '',
    tags: data.tags || [],
    content: content || ''
  };
}

/**
 * Scan a directory for markdown files and convert them to PortfolioItems
 */
export function scanMarkdownDirectory(dirPath: string): PortfolioItem[] {
  try {
    // Check if directory exists
    if (!fs.existsSync(dirPath)) {
      console.warn(`Directory ${dirPath} does not exist`);
      return [];
    }
    
    // Use glob to find all markdown files in the directory
    const markdownFiles = glob.sync(path.join(dirPath, '**/*.md'));
    
    return markdownFiles.map(filePath => readMarkdownFile(filePath));
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
    return [];
  }
}

/**
 * Load all content sections from the content directory
 */
export function loadContentSections(contentBasePath: string): Array<{id: string, name: string, icon: string, items: PortfolioItem[]}> {
  try {
    const sections = [
      {
        id: 'projects',
        name: 'Projects',
        icon: '📁',
        items: scanMarkdownDirectory(path.join(contentBasePath, 'projects'))
      },
      {
        id: 'experience',
        name: 'Experience',
        icon: '💼',
        items: scanMarkdownDirectory(path.join(contentBasePath, 'experience'))
      },
      {
        id: 'blog',
        name: 'Blog',
        icon: '📝',
        items: scanMarkdownDirectory(path.join(contentBasePath, 'blog'))
      }
    ];
    
    return sections;
  } catch (error) {
    console.error('Error loading content sections:', error);
    return [];
  }
}