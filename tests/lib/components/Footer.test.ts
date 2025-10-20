import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Footer from '../../../src/lib/components/Footer.svelte';
import { currentSection, selectedItem } from '../../../src/lib/store';

// Mock the store
vi.mock('../../../src/lib/store', () => ({
  currentSection: {
    subscribe: vi.fn(),
  },
  selectedItem: {
    subscribe: vi.fn(),
  },
}));

describe('Footer', () => {
  it('displays navigation hint and current section/item', () => {
    (currentSection as any).subscribe.mockImplementation((callback: any) => {
      callback({ id: 'projects', name: 'Projects' });
      return vi.fn();
    });
    (selectedItem as any).subscribe.mockImplementation((callback: any) => {
      callback({ id: 'item1', title: 'Test Item' });
      return vi.fn();
    });
    render(Footer);
    expect(screen.getByText('Navigation: hjkl or arrow keys | Section: Projects | Item: Test Item')).toBeInTheDocument();
  });

  it('shows "None" when no section or item selected', () => {
    (currentSection as any).subscribe.mockImplementation((callback: any) => {
      callback(null);
      return vi.fn();
    });
    (selectedItem as any).subscribe.mockImplementation((callback: any) => {
      callback(null);
      return vi.fn();
    });
    render(Footer);
    expect(screen.getByText('Navigation: hjkl or arrow keys | Section: None | Item: None')).toBeInTheDocument();
  });
});