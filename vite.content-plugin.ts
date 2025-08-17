import { glob } from 'glob';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Custom Vite plugin for processing markdown content files
 * 
 * This plugin scans the content directory and converts markdown files into
 * JSON data that can be used by the application at build time.
 * 
 * The plugin only runs during production builds to generate content-data.json
 * which is then used by the application at runtime.
 */
export function contentPlugin() {
  let config: { root: string; };

  return {
    name: 'content-plugin',
    
    configResolved(resolvedConfig: any) {
      config = resolvedConfig;
    },

    async buildStart() {
      // Only run this in build mode, not in dev mode
      if (process.env['NODE_ENV'] === 'production') {
        const contentPath = path.resolve(config.root, 'content');
        const outputPath = path.resolve(config.root, 'src/lib/content-data.json');
        
        try {
          const sections = await loadContentSections(contentPath);
          fs.writeFileSync(outputPath, JSON.stringify(sections, null, 2));
          console.log('Content data generated successfully');
        } catch (error) {
          console.error('Error generating content data:', error);
        }
      }
    }
  };
}

/**
 * Load content sections from the content directory
 * 
 * This function organizes content into sections based on directory structure:
 * - projects/
 * - experience/ 
 * - blog/
 */
async function loadContentSections(contentBasePath: string) {
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

/**
 * Scan a directory for markdown files and process them
 * 
 * This function uses glob to find all .md files in the specified directory
 * and converts them into structured data objects.
 */
function scanMarkdownDirectory(dirPath: string) {
  try {
    // Use glob to find all markdown files in the directory
    const markdownFiles = glob.sync(path.join(dirPath, '**/*.md'));
    
    return markdownFiles.map(filePath => readMarkdownFile(filePath));
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
    return [];
  }
}

/**
 * Read and parse a markdown file
 * 
 * This function reads a markdown file and extracts frontmatter data along with
 * the content, returning a structured object for use in the application.
 */
function readMarkdownFile(filePath: string) {
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
}