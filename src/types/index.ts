/**
 * Type definitions for the Echoes of the Deep portfolio site.
 * 
 * This file contains all TypeScript interfaces and types used throughout the application.
 */

/**
 * Interface representing a portfolio item (project, experience, or blog post).
 * 
 * Portfolio items are typically loaded from markdown files in the content directory.
 */
export interface PortfolioItem {
  /**
   * Unique identifier for the item
   */
  id: string;

  /**
   * Title of the portfolio item
   */
  title: string;

  /**
   * Short description of the portfolio item
   */
  description: string;

  /**
   * Type of the portfolio item (project, experience, or blog)
   */
  type: 'project' | 'experience' | 'blog';

  /**
   * Date associated with the item (optional)
   */
  date?: string;

  /**
   * Tags associated with the item (optional)
   */
  tags?: string[];

  /**
   * Full content of the portfolio item (optional)
   */
  content?: string;
}

/**
 * Interface representing an external link.
 * 
 * External links are typically used for social media profiles or other websites.
 */
export interface ExternalLink {
  /**
   * Unique identifier for the link
   */
  id: string;

  /**
   * Title of the link (displayed in the UI)
   */
  title: string;

  /**
   * URL that the link points to
   */
  url: string;

  /**
   * Icon to display next to the link
   */
  icon: string;
}

/**
 * Type alias for a navigation item.
 * 
 * Navigation items can be either portfolio items or external links.
 */
export type NavigationItem = PortfolioItem | ExternalLink;

/**
 * Interface representing a navigation section.
 * 
 * Navigation sections are groups of items (projects, experience, blog posts, etc.)
 * that appear in the main navigation panel.
 */
export interface NavigationSection {
  /**
   * Unique identifier for the section
   */
  id: string;

  /**
   * Name of the section (displayed in the UI)
   */
  name: string;

  /**
   * Icon to display next to the section name
   */
  icon: string;

  /**
   * Array of items belonging to this section
   */
  items: NavigationItem[];
}