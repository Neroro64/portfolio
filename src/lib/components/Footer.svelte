<script lang="ts">
  import { appStore } from '$lib/store';
  import { onMount } from 'svelte';
  
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

<footer class="border p-2 mt-4">
  <div class="flex justify-between text-sm">
    <span>
      <span class="highlight">Section:</span> {currentSection}
    </span>
    <span>
      {#if selectedItem}
        <span class="highlight">Item:</span> {selectedItem.title}
      {:else}
        <span class="highlight">Item:</span> None
      {/if}
    </span>
  </div>
</footer>