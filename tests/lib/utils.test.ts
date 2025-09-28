import { describe, it, expect, vi } from 'vitest';
import * as fs from 'fs';
import { glob } from 'glob';
import {
  readMarkdownFile,
  scanMarkdownDirectory,
  loadContentSections
} from '../../src/lib/utils';

// Mock file system and glob utilities.
vi.mock('fs');
vi.mock('glob');

describe('readMarkdownFile', () => {
  it('parses markdown with frontmatter correctly', () => {
    const fakeContent = `---\ntitle: Test Title\ndescription: Test Description\ntype: project\ndate: 2025-01-01\ntags:\n  - test\n  - mock\n---\n# Heading\nSome content`;
    (fs.readFileSync as any).mockReturnValue(fakeContent);

    const result = readMarkdownFile('path/to/test.md');
    expect(result.id).toBe('test');
    expect(result.title).toBe('Test Title');
    expect(result.description).toBe('Test Description');
    expect(result.type).toBe('project');
    // gray-matter parses date to Date
    expect(result.date).toEqual(new Date('2025-01-01'));
    expect(result.tags).toEqual(['test', 'mock']);
    expect(result.content).toContain('# Heading');
  });

  it('returns default object on error', () => {
    (fs.readFileSync as any).mockImplementation(() => { throw new Error('read fail'); });
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const result = readMarkdownFile('invalid.md');
    expect(result.id).toBe('invalid');
    expect(result.title).toBe('Error');
    expect(result.content).toContain('An error occurred while loading this content.');
    consoleSpy.mockRestore();
  });
});

describe('scanMarkdownDirectory', () => {
  it('returns empty array when directory does not exist', () => {
    (fs.existsSync as any).mockReturnValue(false);
    const result = scanMarkdownDirectory('/nonexistent');
    expect(result).toEqual([]);
  });

  it('maps markdown files to PortfolioItem using readMarkdownFile', () => {
    (fs.existsSync as any).mockReturnValue(true);
    // Mock glob to return two file names
    (glob.sync as any).mockReturnValue(['a.md', 'b.md']);
    // Provide fake content for each file based on path
    (fs.readFileSync as any).mockImplementation((filePath: string) => {
      if (filePath === 'a.md') {
        return `---\ntitle: A\ndescription: \ntype: project\n---\nContent A`;
      }
      if (filePath === 'b.md') {
        return `---\ntitle: B\ndescription: \ntype: project\n---\nContent B`;
      }
      return '';
    });

    const result = scanMarkdownDirectory('/some/dir');
    expect(result).toEqual([
      { id: 'a', title: 'A', description: '', type: 'project', date: '', tags: [], content: 'Content A' },
      { id: 'b', title: 'B', description: '', type: 'project', date: '', tags: [], content: 'Content B' }
    ]);
  });
});

describe('loadContentSections', () => {
  it('loads sections with scanned items and static links', () => {
    // Mock glob to return different files per directory pattern
    (glob.sync as any).mockImplementation((pattern: string) => {
      if (pattern.includes('projects')) return ['proj1.md'];
      if (pattern.includes('experience')) return ['exp1.md'];
      if (pattern.includes('blog')) return ['blog1.md'];
      return [];
    });

    // Provide fake content for each markdown file
    (fs.readFileSync as any).mockImplementation((filePath: string) => {
      switch (filePath) {
        case 'proj1.md':
          return `---\ntitle: Proj1\ndescription: \ntype: project\n---\nContent`;
        case 'exp1.md':
          return `---\ntitle: Exp1\ndescription: \ntype: experience\n---\nContent`;
        case 'blog1.md':
          return `---\ntitle: Blog1\ndescription: \ntype: blog\n---\nContent`;
        default:
          return '';
      }
    });

    const sections = loadContentSections('/content');
    expect(sections).toHaveLength(4);
    const [proj, exp, blog, links] = sections as any[];
    expect(proj.id).toBe('projects');
    expect(exp.id).toBe('experience');
    expect(blog.id).toBe('blog');
    expect(links.id).toBe('links');

    // Verify items for each section
    expect(proj.items).toEqual([
      { id: 'proj1', title: 'Proj1', description: '', type: 'project', date: '', tags: [], content: 'Content' }
    ]);
    expect(exp.items).toEqual([
      { id: 'exp1', title: 'Exp1', description: '', type: 'experience', date: '', tags: [], content: 'Content' }
    ]);
    expect(blog.items).toEqual([
      { id: 'blog1', title: 'Blog1', description: '', type: 'blog', date: '', tags: [], content: 'Content' }
    ]);

    // Links section contains two static items.
    expect(links.items).toHaveLength(2);
    expect((links.items[0] as any).id).toBe('github');
  });
});

