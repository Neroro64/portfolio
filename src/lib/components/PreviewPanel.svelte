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

<div class="panel">
  {#if selectedItem}
    <div>
      <h2>{selectedItem.title}</h2>
      <p>{selectedItem.description}</p>
      
      {#if selectedItem.content}
        <div>
          <h3>Content:</h3>
          <div class="whitespace-pre-line">{selectedItem.content}</div>
        </div>
      {/if}
      
      <div>
        {#if selectedItem.date}
          <p><span>Date:</span> {selectedItem.date}</p>
        {/if}
        
        {#if selectedItem.tags && selectedItem.tags.length > 0}
          <div>
            <span>Tags:</span>
            <div>
              {#each selectedItem.tags as tag}
                <span class="highlight">{tag}</span>
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