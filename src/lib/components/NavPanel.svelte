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
  
  function selectItem(item: any) {
    appStore.setSelectedItem(item);
  }
</script>

<div class="border p-2 mb-4">
  <h2 class="highlight mb-2">{sections.find(s => s.id === currentSection)?.name}</h2>
  <ul class="space-y-1">
    {#each sections.find(s => s.id === currentSection)?.items as item}
      <li>
        <button 
          class="w-full text-left p-1 hover:bg-green-900"
          on:click={() => selectItem(item)}
        >
          <span class="highlight">•</span> {item.title}
        </button>
      </li>
    {/each}
  </ul>
</div>