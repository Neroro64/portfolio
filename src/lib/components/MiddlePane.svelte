<script lang="ts">
  import { appStore } from '$lib/store';
  import { onMount, onDestroy } from 'svelte';
  
  let sections: any[] = [];
  let currentSection: string = '';
  let selectedItem: any = null;
  let selectedSubItem: any = null;
  
  // Subscribe to store changes
  const unsubscribe = appStore.subscribe((state) => {
    sections = state.sections;
    currentSection = state.currentSection;
    selectedItem = state.selectedItem;
    selectedSubItem = state.selectedSubItem;
  });
  
  onMount(() => {
    return () => unsubscribe();
  });
  
  function selectItem(item: any) {
    appStore.setSelectedItem(item);
  }
  
  function selectSubItem(subItem: any) {
    appStore.setSelectedSubItem(subItem);
  }
  
  $: currentSectionItems = sections.find(s => s.id === currentSection)?.items || [];
  $: subItems = getSubItems(selectedItem);
  
  function getSubItems(item: any) {
    if (!item) return [];
    
    if (item.type === 'project') {
      return [
        { id: 'files', title: 'Files', icon: '📁' },
        { id: 'docs', title: 'Documentation', icon: '📄' }
      ];
    } else if (item.type === 'experience') {
      return [
        { id: 'metrics', title: 'Performance Metrics', icon: '📊' },
        { id: 'team', title: 'Team Members', icon: '👥' }
      ];
    } else if (item.type === 'blog') {
      return [
        { id: 'comments', title: 'Comments', icon: '💬' },
        { id: 'tags', title: 'Tags', icon: '🏷️' }
      ];
    }
    
    return [];
  }
</script>

<div class="panel">
  <h2>Contents of {selectedItem?.title || sections.find(s => s.id === currentSection)?.name}</h2>
  <ul>
    {#if selectedItem}
      {#each subItems as subItem, i}
        <li>
          <button 
            class="{selectedSubItem?.id === subItem.id ? 'selected' : ''}"
            on:click={() => selectSubItem(subItem)}
          >
            <span>{subItem.icon || '•'}</span> {subItem.title}
          </button>
        </li>
      {/each}
    {:else}
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
    {/if}
  </ul>
</div>