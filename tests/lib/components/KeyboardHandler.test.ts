import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import KeyboardHandler from '../../../src/lib/components/KeyboardHandler.svelte';
import {
  focusedPanel,
  navIndex,
  listIndex,
  currentItems,
  sections,
  isPreviewExpanded,
  setPreviewExpanded,
  selectedItem,
  togglePreviewExpanded,
  focusNextPanel,
  focusPrevPanel,
  navigateToSection,
  navigateToListItem,
} from '../../../src/lib/store';

declare const window: any;

// Mock window.open
const mockWindowOpen = vi.fn();
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockWindowOpen,
});

// Mock the store
vi.mock('../../../src/lib/store', () => ({
  focusedPanel: { subscribe: vi.fn() },
  navIndex: { subscribe: vi.fn() },
  listIndex: { subscribe: vi.fn() },
  currentItems: { subscribe: vi.fn() },
  sections: [{ id: 'projects' }, { id: 'experience' }],
  isPreviewExpanded: { subscribe: vi.fn() },
  setPreviewExpanded: vi.fn(),
  selectedItem: { subscribe: vi.fn() },
  togglePreviewExpanded: vi.fn(),
  focusNextPanel: vi.fn(),
  focusPrevPanel: vi.fn(),
  navigateToSection: vi.fn(),
  navigateToListItem: vi.fn(),
}));

describe('KeyboardHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockWindowOpen.mockClear();
  });

  it('focuses next panel on l key', async () => {
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('nav');
      return vi.fn();
    });

    render(KeyboardHandler);
    await fireEvent.keyDown(window, { key: 'l' });
    expect(focusNextPanel).toHaveBeenCalled();
  });

  it('focuses previous panel on h key', async () => {
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('list');
      return vi.fn();
    });

    render(KeyboardHandler);
    await fireEvent.keyDown(window, { key: 'h' });
    expect(focusPrevPanel).toHaveBeenCalled();
  });

  it('navigates sections on j/k when nav focused', async () => {
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('nav');
      return vi.fn();
    });
    (navIndex as any).subscribe.mockImplementation((callback: any) => {
      callback(0);
      return vi.fn();
    });

    render(KeyboardHandler);
    await fireEvent.keyDown(window, { key: 'j' });
    expect(navigateToSection).toHaveBeenCalledWith(1);

    // Reset mock
    vi.clearAllMocks();
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('nav');
      return vi.fn();
    });
    (navIndex as any).subscribe.mockImplementation((callback: any) => {
      callback(1);
      return vi.fn();
    });

    await fireEvent.keyDown(window, { key: 'k' });
    expect(navigateToSection).toHaveBeenCalledWith(0);
  });

  it('navigates list items on j/k when list focused', async () => {
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('list');
      return vi.fn();
    });
    (listIndex as any).subscribe.mockImplementation((callback: any) => {
      callback(0);
      return vi.fn();
    });
    (currentItems as any).subscribe.mockImplementation((callback: any) => {
      callback([{ id: '1' }, { id: '2' }]);
      return vi.fn();
    });

    render(KeyboardHandler);
    await fireEvent.keyDown(window, { key: 'j' });
    expect(navigateToListItem).toHaveBeenCalledWith(1);

    // Reset mock
    vi.clearAllMocks();
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('list');
      return vi.fn();
    });
    (listIndex as any).subscribe.mockImplementation((callback: any) => {
      callback(1);
      return vi.fn();
    });
    (currentItems as any).subscribe.mockImplementation((callback: any) => {
      callback([{ id: '1' }, { id: '2' }]);
      return vi.fn();
    });

    await fireEvent.keyDown(window, { key: 'k' });
    expect(navigateToListItem).toHaveBeenCalledWith(0);
  });

  it('toggles preview expansion on l when preview focused', async () => {
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('preview');
      return vi.fn();
    });
    (selectedItem as any).subscribe.mockImplementation((callback: any) => {
      callback({ id: '1', title: 'Project' });
      return vi.fn();
    });

    render(KeyboardHandler);
    await fireEvent.keyDown(window, { key: 'l' });
    expect(togglePreviewExpanded).toHaveBeenCalled();
  });

  it('opens external link on l when list focused and item selected', async () => {
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('list');
      return vi.fn();
    });
    (selectedItem as any).subscribe.mockImplementation((callback: any) => {
      callback({ id: 'github', url: 'https://github.com' });
      return vi.fn();
    });

    render(KeyboardHandler);
    await fireEvent.keyDown(window, { key: 'l' });
    expect(mockWindowOpen).toHaveBeenCalledWith('https://github.com', '_blank');
  });

  it('opens external link on enter when list focused', async () => {
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('list');
      return vi.fn();
    });
    (selectedItem as any).subscribe.mockImplementation((callback: any) => {
      callback({ id: 'github', url: 'https://github.com' });
      return vi.fn();
    });

    render(KeyboardHandler);
    await fireEvent.keyDown(window, { key: 'Enter' });
    expect(mockWindowOpen).toHaveBeenCalledWith('https://github.com', '_blank');
  });

  it('toggles preview on enter when preview focused', async () => {
    (focusedPanel as any).subscribe.mockImplementation((callback: any) => {
      callback('preview');
      return vi.fn();
    });
    (selectedItem as any).subscribe.mockImplementation((callback: any) => {
      callback({ id: '1', title: 'Project' });
      return vi.fn();
    });

    render(KeyboardHandler);
    await fireEvent.keyDown(window, { key: 'Enter' });
    expect(togglePreviewExpanded).toHaveBeenCalled();
  });

  it('closes expanded preview on escape', async () => {
    (isPreviewExpanded as any).subscribe.mockImplementation((callback: any) => {
      callback(true);
      return vi.fn();
    });

    render(KeyboardHandler);
    await fireEvent.keyDown(window, { key: 'Escape' });
    expect(setPreviewExpanded).toHaveBeenCalledWith(false);
  });
});