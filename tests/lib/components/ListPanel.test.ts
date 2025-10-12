import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import ListPanel from '../../../src/lib/components/ListPanel.svelte';
import { currentSection, currentItems, listIndex, focusedPanel, navigateToListItem } from '../../../src/lib/store';

// Mock the store
vi.mock('../../../src/lib/store', () => ({
  currentSection: { subscribe: vi.fn() },
  currentItems: { subscribe: vi.fn() },
  listIndex: { subscribe: vi.fn() },
  focusedPanel: { subscribe: vi.fn(), set: vi.fn() },
  navigateToListItem: vi.fn(),
}));

describe('ListPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders section name and list of items', () => {
    (currentSection as any).subscribe.mockImplementation((callback: any) => {
      callback({ id: 'projects', name: 'Projects' });
      return vi.fn();
    });
    (currentItems as any).subscribe.mockImplementation((callback: any) => {
      callback([
        { id: '1', title: 'Project 1', date: '2023-01-01', type: 'project' },
        { id: '2', title: 'Project 2', date: '2023-02-01', type: 'project' },
      ]);
      return vi.fn();
    });
    (listIndex as any).subscribe.mockImplementation((callback: any) => {
      callback(0);
      return vi.fn();
    });
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('list');
      return vi.fn();
    });

    render(ListPanel);
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('• Project 1')).toBeInTheDocument();
    expect(screen.getByText('• Project 2')).toBeInTheDocument();
  });

  it('applies selected class to current item', () => {
    (currentSection as any).subscribe.mockImplementation((callback: any) => {
      callback({ id: 'projects', name: 'Projects' });
      return vi.fn();
    });
    (currentItems as any).subscribe.mockImplementation((callback: any) => {
      callback([
        { id: '1', title: 'Project 1', date: '2023-01-01', type: 'project' },
      ]);
      return vi.fn();
    });
    (listIndex as any).subscribe.mockImplementation((callback: any) => {
      callback(0);
      return vi.fn();
    });
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('list');
      return vi.fn();
    });

    render(ListPanel);
    const button = screen.getByRole('button', { name: /Project 1/ });
    expect(button).toHaveClass('selected');
  });

  it('calls navigateToListItem and sets focus on item click', async () => {
    (currentSection as any).subscribe.mockImplementation((callback: any) => {
      callback({ id: 'projects', name: 'Projects' });
      return vi.fn();
    });
    (currentItems as any).subscribe.mockImplementation((callback: any) => {
      callback([
        { id: '1', title: 'Project 1', date: '2023-01-01', type: 'project' },
        { id: '2', title: 'Project 2', date: '2023-02-01', type: 'project' },
      ]);
      return vi.fn();
    });
    (listIndex as any).subscribe.mockImplementation((callback: any) => {
      callback(0);
      return vi.fn();
    });
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('nav');
      return vi.fn();
    });

    render(ListPanel);
    const button = screen.getByRole('button', { name: /Project 2/ });
    await fireEvent.click(button);
    expect(navigateToListItem).toHaveBeenCalledWith(1);
    expect(focusedPanel.set).toHaveBeenCalledWith('list');
  });

  it('renders external links differently', () => {
    (currentSection as any).subscribe.mockImplementation((callback: any) => {
      callback({ id: 'links', name: 'Links' });
      return vi.fn();
    });
    (currentItems as any).subscribe.mockImplementation((callback: any) => {
      callback([
        { id: 'github', title: 'GitHub', url: 'https://github.com', icon: '🐙' },
      ]);
      return vi.fn();
    });
    (listIndex as any).subscribe.mockImplementation((callback: any) => {
      callback(0);
      return vi.fn();
    });
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('list');
      return vi.fn();
    });

    render(ListPanel);
    expect(screen.getByText('🐙 GitHub')).toBeInTheDocument();
    expect(screen.getByText('External Link')).toBeInTheDocument();
  });

  it('shows no items message when empty', () => {
    (currentSection as any).subscribe.mockImplementation((callback: any) => {
      callback({ id: 'empty', name: 'Empty' });
      return vi.fn();
    });
    (currentItems as any).subscribe.mockImplementation((callback: any) => {
      callback([]);
      return vi.fn();
    });
    (listIndex as any).subscribe.mockImplementation((callback: any) => {
      callback(0);
      return vi.fn();
    });
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('list');
      return vi.fn();
    });

    render(ListPanel);
    expect(screen.getByText('No items in this section.')).toBeInTheDocument();
  });
});