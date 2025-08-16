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
</script>

<div class="panel">
  <h2>Items in {sections.find(s => s.id === currentSection)?.name}</h2>
  <div>
    {#each sections.find(s => s.id === currentSection)?.items as item}
      <div class="border">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div>
          {#if item.date}
            <span>{item.date}</span>
          {/if}
          {#if item.tags && item.tags.length > 0}
            <div>
              {#each item.tags as tag}
                <span class="highlight">{tag}</span>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>