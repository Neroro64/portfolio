import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import NavPanel from '../../../src/lib/components/NavPanel.svelte';
import { navIndex, focusedPanel, navigateToSection } from '../../../src/lib/store';

// Mock the store
vi.mock('../../../src/lib/store', () => ({
  navIndex: { subscribe: vi.fn() },
  focusedPanel: { subscribe: vi.fn(), set: vi.fn() },
  sections: [
    { id: 'projects', name: 'Projects', icon: '📁' },
    { id: 'experience', name: 'Experience', icon: '💼' },
  ],
  navigateToSection: vi.fn(),
}));

describe('NavPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders sections list', () => {
    (navIndex as any).subscribe.mockImplementation((callback: any) => {
      callback(0);
      return vi.fn();
    });
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('nav');
      return vi.fn();
    });

    render(NavPanel);
    expect(screen.getByText('Sections')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '📁 Projects' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '💼 Experience' })).toBeInTheDocument();
  });

  it('applies selected class to current section', () => {
    (navIndex as any).subscribe.mockImplementation((callback: any) => {
      callback(1);
      return vi.fn();
    });
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('nav');
      return vi.fn();
    });

    render(NavPanel);
    const projectsButton = screen.getByRole('button', { name: /Projects/ });
    const experienceButton = screen.getByRole('button', { name: /Experience/ });
    expect(projectsButton).not.toHaveClass('selected');
    expect(experienceButton).toHaveClass('selected');
  });

  it('calls navigateToSection and sets focus on section click', async () => {
    (navIndex as any).subscribe.mockImplementation((callback: any) => {
      callback(0);
      return vi.fn();
    });
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('list');
      return vi.fn();
    });

    render(NavPanel);
    const experienceButton = screen.getByRole('button', { name: /Experience/ });
    await fireEvent.click(experienceButton);
    expect(navigateToSection).toHaveBeenCalledWith(1);
    expect(focusedPanel.set).toHaveBeenCalledWith('list');
  });
});