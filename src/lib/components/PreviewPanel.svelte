<script lang="ts">
  import { appStore } from '$lib/store';
  import { onMount, onDestroy } from 'svelte';
  
  let selectedItem: any = null;
  
  // Subscribe to store changes
  const unsubscribe = appStore.subscribe((state) => {
    selectedItem = state.selectedItem;
  });
  
  onMount(() => {
    return () => unsubscribe();
  });
</script>

<div class="border p-2 bg-black text-green-400 font-mono">
  {#if selectedItem}
    <div>
      <h2 class="text-xl mb-2">{selectedItem.title}</h2>
      <p class="mb-3">{selectedItem.description}</p>
      
      {#if selectedItem.content}
        <div class="mt-4">
          <h3>Content:</h3>
          <div class="mt-2 whitespace-pre-line">{selectedItem.content}</div>
        </div>
      {/if}
      
      <div class="mt-4 text-sm">
        {#if selectedItem.date}
          <p><span>Date:</span> {selectedItem.date}</p>
        {/if}
        
        {#if selectedItem.tags && selectedItem.tags.length > 0}
          <div class="mt-2">
            <span>Tags:</span>
            <div class="mt-1 flex flex-wrap gap-1">
              {#each selectedItem.tags as tag}
                <span class="px-2 py-1 bg-green-900 text-xs">{tag}</span>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  {:else}
    <p>Select an item to preview</p>
  {/if}
</div>