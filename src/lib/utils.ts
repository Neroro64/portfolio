/**
 * Utility functions for handling content loading and processing.
 * 
 * This module provides functions for reading markdown files, scanning directories,
 * and organizing content into navigation sections for the portfolio site.
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import type { PortfolioItem, ExternalLink } from '$types/index';

/**
 * Read and parse a markdown file with frontmatter.
 * 
 * This function reads a markdown file, extracts its frontmatter (metadata),
 * and returns it as a PortfolioItem object.
 * 
 * @param filePath - The path to the markdown file
 * @returns A PortfolioItem object containing the parsed content
 */
export function readMarkdownFile(filePath: string): PortfolioItem {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      id: path.basename(filePath, path.extname(filePath)),
      title: data['title'] || '',
      description: data['description'] || '',
      type: data['type'] || 'project',
      date: data['date'] || '',
      tags: data['tags'] || [],
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
 * Scan a directory for markdown files and convert them to PortfolioItems.
 * 
 * This function finds all markdown files in a given directory and converts
 * each one into a PortfolioItem using the readMarkdownFile function.
 * 
 * @param dirPath - The path to the directory to scan
 * @returns An array of PortfolioItem objects
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
 * Load all content sections from the content directory.
 * 
 * This function scans the content directory and organizes its contents
 * into navigation sections with their respective items.
 * 
 * @param contentBasePath - The base path to the content directory
 * @returns An array of NavigationSection objects
 */
export function loadContentSections(contentBasePath: string): Array<{ id: string, name: string, icon: string, items: (PortfolioItem | ExternalLink)[] }> {
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