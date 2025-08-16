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
  
  // Keyboard navigation for items
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' || event.key === 'k') {
      event.preventDefault();
      const section = sections.find(s => s.id === currentSection);
      if (section && section.items.length > 0) {
        // Find current item index and select previous one
        let currentIndex = -1;
        if (selectedItem) {
          currentIndex = section.items.findIndex((item: any) => item.id === selectedItem.id);
        }
        const prevIndex = (currentIndex - 1 + section.items.length) % section.items.length;
        selectItem(section.items[prevIndex]);
      }
    } else if (event.key === 'ArrowDown' || event.key === 'j') {
      event.preventDefault();
      const section = sections.find(s => s.id === currentSection);
      if (section && section.items.length > 0) {
        // Find current item index and select next one
        let currentIndex = -1;
        if (selectedItem) {
          currentIndex = section.items.findIndex((item: any) => item.id === selectedItem.id);
        }
        const nextIndex = (currentIndex + 1) % section.items.length;
        selectItem(section.items[nextIndex]);
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      // If an item is selected, open it in preview
      if (selectedItem) {
        appStore.setSelectedItem(selectedItem);
      }
    }
  }
  
  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });
</script>

<div class="panel">
  <h2>Contents of {selectedItem?.title || sections.find(s => s.id === currentSection)?.name}</h2>
  <ul>
    {#if selectedItem}
      {#if selectedItem.type === 'project'}
        <li>
          <button class="bg-green-900">
            <span>📁</span> Files
          </button>
        </li>
        <li>
          <button>
            <span>📄</span> Documentation
          </button>
        </li>
      {:else if selectedItem.type === 'experience'}
        <li>
          <button>
            <span>📊</span> Performance Metrics
          </button>
        </li>
        <li>
          <button>
            <span>👥</span> Team Members
          </button>
        </li>
      {:else if selectedItem.type === 'blog'}
        <li>
          <button>
            <span>💬</span> Comments
          </button>
        </li>
        <li>
          <button>
            <span>🏷️</span> Tags
          </button>
        </li>
      {/if}
    {:else}
      {#each sections.find(s => s.id === currentSection)?.items as item}
        <li>
          <button 
            class="{selectedItem?.id === item.id ? 'bg-green-900' : ''}"
            on:click={() => selectItem(item)}
          >
            <span>{item.icon || '•'}</span> {item.title}
          </button>
        </li>
      {/each}
    {/if}
  </ul>
</div>