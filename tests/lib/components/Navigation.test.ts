import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Navigation from '../../../src/lib/components/Navigation.svelte';
import { appStore } from '../../../src/lib/store';

declare const window: any;

// Mock the store
vi.mock('../../../src/lib/store', () => ({
  appStore: {
    subscribe: vi.fn((callback) => {
      callback({ sections: [{ id: 'projects', name: 'Projects', icon: '📁' }], currentSection: 'projects' });
      return vi.fn();
    }),
    setCurrentSection: vi.fn(),
  },
}));

describe('Navigation', () => {
  it('renders section buttons', () => {
    render(Navigation);
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('calls setCurrentSection on button click', async () => {
    render(Navigation);
    const button = screen.getByRole('button', { name: /projects/i });
    await fireEvent.click(button);
    expect((appStore as any).setCurrentSection).toHaveBeenCalledWith('projects');
  });

  it('handles keyboard navigation', async () => {
    render(Navigation);
    await fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect((appStore as any).setCurrentSection).toHaveBeenCalledWith('projects'); // assuming single section, loops back
  });
});

