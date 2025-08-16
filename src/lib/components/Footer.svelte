<script lang="ts">
  import { appStore } from '$lib/store';
  import { onMount, onDestroy } from 'svelte';
  
  let currentSection: string = '';
  let selectedItem: any = null;
  
  // Subscribe to store changes
  const unsubscribe = appStore.subscribe((state) => {
    currentSection = state.currentSection;
    selectedItem = state.selectedItem;
  });
  
  onMount(() => {
    return () => unsubscribe();
  });
</script>

<footer class="border p-2 mt-4 bg-black text-green-400 font-mono text-sm">
  <div class="flex justify-between">
    <span>
      Section: {currentSection}
    </span>
    <span>
      {#if selectedItem}
        Item: {selectedItem.title}
      {:else}
        Item: None
      {/if}
    </span>
  </div>
</footer>