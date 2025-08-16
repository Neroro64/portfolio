<script lang="ts">
  import { appStore } from '$lib/store';
  import { onMount, onDestroy } from 'svelte';
  
  let currentSection: string = '';
  let selectedItem: any = null;
  let selectedSubItem: any = null;
  
  // Subscribe to store changes
  const unsubscribe = appStore.subscribe((state) => {
    currentSection = state.currentSection;
    selectedItem = state.selectedItem;
    selectedSubItem = state.selectedSubItem;
  });
  
  onMount(() => {
    return () => unsubscribe();
  });
</script>

<footer>
  <div>
    <span>
      Section: {currentSection}
    </span>
    <span>
      {#if selectedSubItem}
        Item: {selectedItem?.title} / {selectedSubItem?.title}
      {:else if selectedItem}
        Item: {selectedItem?.title}
      {:else}
        Item: None
      {/if}
    </span>
  </div>
</footer>