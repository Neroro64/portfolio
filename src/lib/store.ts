import { writable } from 'svelte/store';
import type { NavigationSection, PortfolioItem } from '$types/index';

// Define the store structure
interface AppState {
  currentSection: string;
  selectedItem: PortfolioItem | null;
  sections: NavigationSection[];
}

// Create a new store with initial state
function createAppStore() {
  const initialState: AppState = {
    currentSection: 'projects',
    selectedItem: null,
    sections: [
      {
        id: 'projects',
        name: 'Projects',
        icon: '📁',
        items: []
      },
      {
        id: 'experience',
        name: 'Experience',
        icon: '💼',
        items: []
      },
      {
        id: 'blog',
        name: 'Blog',
        icon: '📝',
        items: []
      }
    ]
  };

  const { subscribe, set, update } = writable<AppState>(initialState);

  return {
    subscribe,
    setCurrentSection: (sectionId: string) => update(state => ({
      ...state,
      currentSection: sectionId
    })),
    setSelectedItem: (item: PortfolioItem | null) => update(state => ({
      ...state,
      selectedItem: item
    })),
    setSections: (sections: NavigationSection[]) => update(state => ({
      ...state,
      sections
    }))
  };
}

export const appStore = createAppStore();