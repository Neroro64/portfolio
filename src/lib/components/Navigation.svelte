<script lang="ts">
  import { appStore } from '$lib/store';
  import { onMount } from 'svelte';
  
  let sections: any[] = [];
  let currentSection: string = '';
  
  // Subscribe to store changes
  const unsubscribe = appStore.subscribe((state) => {
    sections = state.sections;
    currentSection = state.currentSection;
  });
  
  onMount(() => {
    return () => unsubscribe();
  });
  
  function selectSection(sectionId: string) {
    appStore.setCurrentSection(sectionId);
  }
</script>

<nav class="border p-2 mb-4">
  <div class="flex flex-wrap gap-2">
    {#each sections as section}
      <button 
        class="px-3 py-1 border {currentSection === section.id ? 'bg-green-900' : 'bg-transparent'}"
        on:click={() => selectSection(section.id)}
      >
        <span class="highlight">{section.icon}</span> {section.name}
      </button>
    {/each}
  </div>
</nav>