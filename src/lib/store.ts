import { writable } from 'svelte/store';
import type { NavigationSection, PortfolioItem } from '$types/index';

// Define the store structure
interface AppState {
  currentSection: string;
  selectedItem: PortfolioItem | null;
  selectedSubItem: any | null;
  sections: NavigationSection[];
}

// Create a new store with initial state
function createAppStore() {
  const initialState: AppState = {
    currentSection: 'projects',
    selectedItem: null,
    selectedSubItem: null,
    sections: [
      {
        id: 'projects',
        name: 'Projects',
        icon: '📁',
        items: [
          {
            id: 'project1',
            title: 'Echoes of the Deep Portfolio',
            description: 'A terminal-inspired portfolio website built with Svelte and TypeScript.',
            type: 'project',
            date: '2023-08-15',
            tags: ['Svelte', 'TypeScript', 'Bun'],
            content: 'This portfolio showcases my work in a Ranger-like terminal interface. It features multi-panel navigation, keyboard controls, and a retro terminal aesthetic.'
          },
          {
            id: 'project2',
            title: 'Task Management App',
            description: 'A productivity application for managing daily tasks with a focus on minimalism.',
            type: 'project',
            date: '2023-06-22',
            tags: ['React', 'Node.js', 'MongoDB'],
            content: 'Built with React and Node.js, this app provides a clean interface for task management with real-time updates and offline capabilities.'
          },
          {
            id: 'project3',
            title: 'Weather Dashboard',
            description: 'Real-time weather information with forecasting capabilities.',
            type: 'project',
            date: '2023-04-10',
            tags: ['Vue.js', 'API Integration'],
            content: 'A responsive dashboard that displays current weather conditions and forecasts using multiple weather APIs.'
          }
        ]
      },
      {
        id: 'experience',
        name: 'Experience',
        icon: '💼',
        items: [
          {
            id: 'exp1',
            title: 'Senior Frontend Developer',
            description: 'Led development of multiple web applications for enterprise clients.',
            type: 'experience',
            date: '2022-01-01',
            tags: ['React', 'TypeScript', 'Node.js'],
            content: 'As a senior developer, I was responsible for architecting and implementing complex frontend solutions. My team delivered several high-impact projects on time and within budget.'
          },
          {
            id: 'exp2',
            title: 'UI/UX Designer',
            description: 'Designed user interfaces for mobile and web applications.',
            type: 'experience',
            date: '2020-03-15',
            tags: ['Figma', 'Adobe XD'],
            content: 'Created wireframes, prototypes, and high-fidelity designs that improved user engagement by 40% across multiple products.'
          }
        ]
      },
      {
        id: 'blog',
        name: 'Blog',
        icon: '📝',
        items: [
          {
            id: 'blog1',
            title: 'Getting Started with SvelteKit',
            description: 'A beginner-friendly guide to building applications with SvelteKit.',
            type: 'blog',
            date: '2023-08-10',
            tags: ['Svelte', 'Tutorial'],
            content: 'In this article, I walk through the basics of SvelteKit and how to get started building modern web applications. We cover routing, components, and state management.'
          },
          {
            id: 'blog2',
            title: 'The Art of Minimalist Design',
            description: 'Exploring principles of minimalist UI design in modern web applications.',
            type: 'blog',
            date: '2023-07-05',
            tags: ['Design', 'UX'],
            content: 'Minimalism in design isn\'t about having less - it\'s about having exactly what you need. This article explores how to apply minimalist principles effectively.'
          },
          {
            id: 'blog3',
            title: 'Building Accessible Web Applications',
            description: 'Best practices for creating inclusive web experiences.',
            type: 'blog',
            date: '2023-05-20',
            tags: ['Accessibility', 'WCAG'],
            content: 'Creating web applications that are accessible to all users is not just a legal requirement but a moral imperative. This guide covers essential practices.'
          }
        ]
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
      selectedItem: item,
      selectedSubItem: null
    })),
    setSelectedSubItem: (subItem: any | null) => update(state => ({
      ...state,
      selectedSubItem: subItem
    }))
  };
}

export const appStore = createAppStore();