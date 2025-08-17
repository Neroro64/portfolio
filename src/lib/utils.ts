import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import type { PortfolioItem, ExternalLink } from '$types/index';
import { fileURLToPath } from 'url';

// Get the directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Read and parse a markdown file with frontmatter
 */
export function readMarkdownFile(filePath: string): PortfolioItem {
  try {
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
  } catch (error) {
    console.error(`Error reading markdown file ${filePath}:`, error);
    // Return a default object to prevent crashes
    return {
      id: path.basename(filePath, path.extname(filePath)),
      title: 'Error',
      description: 'Failed to load content',
      type: 'project',
      date: '',
      tags: [],
      content: 'An error occurred while loading this content.'
    };
  }
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
export function loadContentSections(contentBasePath: string): Array<{id: string, name: string, icon: string, items: (PortfolioItem | ExternalLink)[]}> {
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
      },
      {
        id: 'links',
        name: 'Links',
        icon: '🔗',
        items: [
          {
            id: 'github',
            title: 'GitHub Profile',
            url: 'https://github.com/alexmorgan',
            icon: '🐙'
          },
          {
            id: 'linkedin',
            title: 'LinkedIn Profile',
            url: 'https://www.linkedin.com/in/alexmorgan',
            icon: '👔'
          },
          {
            id: 'portfolio-site',
            title: 'Portfolio Website',
            url: 'https://alexmorgan.dev',
            icon: '🌐'
          },
          {
            id: 'twitter',
            title: 'Twitter Profile',
            url: 'https://twitter.com/alexmorgan_dev',
            icon: '🐦'
          },
          {
            id: 'medium',
            title: 'Medium Articles',
            url: 'https://medium.com/@alexmorgan',
            icon: '📰'
          }
        ] as ExternalLink[]
      }
    ];
    
    return sections;
  } catch (error) {
    console.error('Error loading content sections:', error);
    return [];
  }
}