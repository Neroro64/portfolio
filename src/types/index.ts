export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'experience' | 'blog';
  date?: string;
  tags?: string[];
  content?: string;
}

export interface ExternalLink {
  id: string;
  title: string;
  url: string;
  icon: string;
}

export type NavigationItem = PortfolioItem | ExternalLink;

export interface NavigationSection {
  id: string;
  name: string;
  icon: string;
  items: NavigationItem[];
}