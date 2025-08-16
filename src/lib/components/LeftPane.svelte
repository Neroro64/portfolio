<script lang="ts">
  import { appStore } from '$lib/store';
  import { onMount, onDestroy } from 'svelte';
  
  let sections: any[] = [];
  let currentSection: string = '';
  let selectedItem: any = null;
  
  // Subscribe to store changes
  const unsubscribe = appStore.subscribe((state) => {
    sections = state.sections;
    currentSection = state.currentSection;
    selectedItem = state.selectedItem;
  });
  
  onMount(() => {
    return () => unsubscribe();
  });
  
  function selectItem(item: any) {
    appStore.setSelectedItem(item);
  }
  
  $: currentSectionItems = sections.find(s => s.id === currentSection)?.items || [];
</script>

<div class="panel">
  <h2>{sections.find(s => s.id === currentSection)?.name}</h2>
  <ul>
    {#each currentSectionItems as item, i}
      <li>
        <button 
          class="{selectedItem?.id === item.id ? 'selected' : ''}"
          on:click={() => selectItem(item)}
        >
          <span>{item.icon || '•'}</span> {item.title}
        </button>
      </li>
    {/each}
  </ul>
</div>