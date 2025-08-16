export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'experience' | 'blog';
  date?: string;
  tags?: string[];
  content?: string;
}

export interface NavigationSection {
  id: string;
  name: string;
  icon: string;
  items: PortfolioItem[];
}