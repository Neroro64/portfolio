<script lang="ts">
  import { appStore } from '$lib/store';
  
  // Initialize with some sample data
  appStore.setSections([
    {
      id: 'projects',
      name: 'Projects',
      icon: '📁',
      items: [
        {
          id: 'project1',
          title: 'Project Alpha',
          description: 'A revolutionary web application built with modern technologies.',
          type: 'project',
          date: '2023-05-15',
          tags: ['Svelte', 'TypeScript', 'Bun'],
          content: 'This project showcases my expertise in building performant web applications using Svelte and TypeScript. It features a clean architecture with proper separation of concerns.'
        },
        {
          id: 'project2',
          title: 'Portfolio Website',
          description: 'My personal portfolio website with a terminal-inspired UI.',
          type: 'project',
          date: '2023-10-22',
          tags: ['Svelte', 'CSS', 'Responsive'],
          content: 'This portfolio website demonstrates my design skills and attention to detail. The terminal-inspired UI provides an unique browsing experience.'
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
        }
      ]
    }
  ]);
</script>

<div class="container">
  <h1>Welcome to Echoes of the Deep</h1>
  <p>This is a terminal-inspired portfolio website with Ranger-like navigation.</p>
  <p>Use the navigation panel to explore different sections of my work.</p>
</div>