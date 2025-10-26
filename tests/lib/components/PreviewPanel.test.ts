import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import PreviewPanel from '../../../src/lib/components/PreviewPanel.svelte';
import { selectedItem, focusedPanel, isPreviewExpanded, setPreviewExpanded } from '../../../src/lib/store';

declare const window: any;

// Mock window.open
const mockWindowOpen = vi.fn();
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockWindowOpen,
});

// Mock the store
vi.mock('../../../src/lib/store', () => ({
  selectedItem: { subscribe: vi.fn() },
  focusedPanel: { subscribe: vi.fn(), set: vi.fn() },
  isPreviewExpanded: { subscribe: vi.fn() },
  setPreviewExpanded: vi.fn()
}));

describe('PreviewPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockWindowOpen.mockClear();
  });

  it('shows placeholder when no item selected', () => {
    (selectedItem as any).subscribe.mockImplementation((callback: any) => {
      callback(null);
      return vi.fn();
    });
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('preview');
      return vi.fn();
    });
    (isPreviewExpanded as any).subscribe.mockImplementation((callback: any) => {
      callback(false);
      return vi.fn();
    });

    render(PreviewPanel);
    expect(screen.getByText('Select an item to preview.')).toBeInTheDocument();
  });

  it('renders portfolio item content', () => {
    (selectedItem as any).subscribe.mockImplementation((callback: any) => {
      callback({
        id: '1',
        title: 'Test Project',
        content: '# Hello\nThis is content.',
        date: '2023-01-01',
        tags: ['tag1', 'tag2'],
        type: 'project',
      });
      return vi.fn();
    });
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('preview');
      return vi.fn();
    });
    (isPreviewExpanded as any).subscribe.mockImplementation((callback: any) => {
      callback(false);
      return vi.fn();
    });

    render(PreviewPanel);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Tags:')).toBeInTheDocument();
    expect(screen.getByText('tag1|')).toBeInTheDocument();
    expect(screen.getByText('tag2|')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument(); // formatted date
  });

  it('renders external link content', () => {
    (selectedItem as any).subscribe.mockImplementation((callback: any) => {
      callback({
        id: 'github',
        title: 'GitHub',
        description: 'Code repository',
        url: 'https://github.com',
      });
      return vi.fn();
    });
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('preview');
      return vi.fn();
    });
    (isPreviewExpanded as any).subscribe.mockImplementation((callback: any) => {
      callback(false);
      return vi.fn();
    });

    render(PreviewPanel);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Code repository')).toBeInTheDocument();
    expect(screen.getByText('External Link:')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'https://github.com' })).toBeInTheDocument();
  });

  it('toggles expansion on click for portfolio item', async () => {
    (selectedItem as any).subscribe.mockImplementation((callback: any) => {
      callback({
        id: '1',
        title: 'Test Project',
        content: 'Content',
        type: 'project',
      });
      return vi.fn();
    });
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('preview');
      return vi.fn();
    });
    (isPreviewExpanded as any).subscribe.mockImplementation((callback: any) => {
      callback(false);
      return vi.fn();
    });

    render(PreviewPanel);
    const panel = screen.getByRole('button', { name: 'Preview Panel' });
    await fireEvent.click(panel);
    expect(setPreviewExpanded).toHaveBeenCalledWith(true);
  });

  it('opens external link on click', async () => {
    (selectedItem as any).subscribe.mockImplementation((callback: any) => {
      callback({
        id: 'github',
        title: 'GitHub',
        url: 'https://github.com',
      });
      return vi.fn();
    });
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('preview');
      return vi.fn();
    });
    (isPreviewExpanded as any).subscribe.mockImplementation((callback: any) => {
      callback(false);
      return vi.fn();
    });

    render(PreviewPanel);
    const panel = screen.getByRole('button', { name: 'Preview Panel' });
    await fireEvent.click(panel);
    expect(mockWindowOpen).toHaveBeenCalledWith('https://github.com', '_blank');
  });

  it('does not expand on touch when device is touch-capable', async () => {
    // Simulate a touch-capable environment
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: 1,
      writable: true,
    });

    (selectedItem as any).subscribe.mockImplementation((callback: any) => {
      callback({
        id: '1',
        title: 'Test Project',
        content: 'Content',
        type: 'project',
      });
      return vi.fn();
    });
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('preview');
      return vi.fn();
    });
    (isPreviewExpanded as any).subscribe.mockImplementation((callback: any) => {
      callback(false);
      return vi.fn();
    });

    render(PreviewPanel);
    const panel = screen.getByRole('button', { name: 'Preview Panel' });
    await fireEvent.touchStart(panel, { touches: [{ clientX: 100 }] });
    expect(setPreviewExpanded).not.toHaveBeenCalled();
  })
  it('handles keydown enter for portfolio item', async () => {
    (selectedItem as any).subscribe.mockImplementation((callback: any) => {
      callback({
        id: '1',
        title: 'Test Project',
        content: 'Content',
        type: 'project',
      });
      return vi.fn();
    });
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('preview');
      return vi.fn();
    });
    (isPreviewExpanded as any).subscribe.mockImplementation((callback: any) => {
      callback(false);
      return vi.fn();
    });

    render(PreviewPanel);
    const panel = screen.getByRole('button', { name: 'Preview Panel' });
    await fireEvent.keyDown(panel, { key: 'Enter' });
    expect(setPreviewExpanded).toHaveBeenCalledWith(true);
  });

  it('closes expanded preview on escape', async () => {
    (selectedItem as any).subscribe.mockImplementation((callback: any) => {
      callback({
        id: '1',
        title: 'Test Project',
        content: 'Content',
        type: 'project',
      });
      return vi.fn();
    });
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('preview');
      return vi.fn();
    });
    (isPreviewExpanded as any).subscribe.mockImplementation((callback: any) => {
      callback(true);
      return vi.fn();
    });

    render(PreviewPanel);
    await fireEvent.keyDown(window, { key: 'Escape' });
    expect(setPreviewExpanded).toHaveBeenCalledWith(false);
  });
});