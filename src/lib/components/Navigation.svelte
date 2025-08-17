<script lang="ts">
  import { appStore } from '$lib/store';
  import { onMount, onDestroy } from 'svelte';
  
  let sections: any[] = [];
  let currentSection: string = '';
  
  // Subscribe to store changes
  const unsubscribe = appStore.subscribe((state: any) => {
    sections = state.sections;
    currentSection = state.currentSection;
  });
  
  onMount(() => {
    return () => unsubscribe();
  });
  
  function selectSection(sectionId: string) {
    appStore.setCurrentSection(sectionId);
  }
  
  // Keyboard navigation
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'h') {
      event.preventDefault();
      const currentIndex = sections.findIndex(s => s.id === currentSection);
      const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
      selectSection(sections[prevIndex].id);
    } else if (event.key === 'ArrowRight' || event.key === 'l') {
      event.preventDefault();
      const currentIndex = sections.findIndex(s => s.id === currentSection);
      const nextIndex = (currentIndex + 1) % sections.length;
      selectSection(sections[nextIndex].id);
    }
  }
  
  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });
</script>

<nav class="border">
  <div>
    {#each sections as section}
      <button 
        class="{currentSection === section.id ? 'selected' : ''}"
        on:click={() => selectSection(section.id)}
      >
        <span>{section.icon}</span> {section.name}
      </button>
    {/each}
  </div>
</nav>