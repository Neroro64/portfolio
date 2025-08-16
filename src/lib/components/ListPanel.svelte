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

<div class="border p-2 mb-4 bg-black text-green-400 font-mono">
  <h2 class="mb-2">Items in {sections.find(s => s.id === currentSection)?.name}</h2>
  <div class="space-y-3">
    {#each sections.find(s => s.id === currentSection)?.items as item}
      <div class="p-2 border">
        <h3>{item.title}</h3>
        <p class="text-sm mt-1">{item.description}</p>
        <div class="mt-2 text-xs">
          {#if item.date}
            <span>{item.date}</span>
          {/if}
          {#if item.tags && item.tags.length > 0}
            <div class="mt-1 flex flex-wrap gap-1">
              {#each item.tags as tag}
                <span class="px-2 py-1 bg-green-900 text-xs">{tag}</span>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>