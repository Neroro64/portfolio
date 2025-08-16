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
  
  // Global keyboard navigation
  function handleKeyDown(event: KeyboardEvent) {
    // Only handle navigation if not in an input field
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return;
    }
    
    const section = sections.find(s => s.id === currentSection);
    if (!section || !section.items.length) return;
    
    if (event.key === 'ArrowUp' || event.key === 'k') {
      event.preventDefault();
      navigateUp(section);
    } else if (event.key === 'ArrowDown' || event.key === 'j') {
      event.preventDefault();
      navigateDown(section);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      selectCurrentItem();
    } else if (event.key === 'Tab') {
      event.preventDefault();
      // We could implement pane switching here if needed
    }
  }
  
  function navigateUp(section: any) {
    // If we're in the middle pane with sub items
    if (selectedItem && !selectedSubItem) {
      // Navigate through main items
      let currentIndex = section.items.findIndex((item: any) => item.id === selectedItem.id);
      if (currentIndex === -1) currentIndex = 0;
      const prevIndex = (currentIndex - 1 + section.items.length) % section.items.length;
      appStore.setSelectedItem(section.items[prevIndex]);
    } 
    // If we have a sub item selected
    else if (selectedItem && selectedSubItem) {
      const subItems = getSubItems(selectedItem);
      let currentIndex = subItems.findIndex((item: any) => item.id === selectedSubItem.id);
      if (currentIndex === -1) currentIndex = 0;
      const prevIndex = (currentIndex - 1 + subItems.length) % subItems.length;
      appStore.setSelectedSubItem(subItems[prevIndex]);
    }
    // If we're in left pane (no selection yet)
    else if (!selectedItem) {
      let currentIndex = 0; // Default to first item
      const prevIndex = (currentIndex - 1 + section.items.length) % section.items.length;
      appStore.setSelectedItem(section.items[prevIndex]);
    }
  }
  
  function navigateDown(section: any) {
    // If we're in the middle pane with sub items
    if (selectedItem && !selectedSubItem) {
      // Navigate through main items
      let currentIndex = section.items.findIndex((item: any) => item.id === selectedItem.id);
      if (currentIndex === -1) currentIndex = 0;
      const nextIndex = (currentIndex + 1) % section.items.length;
      appStore.setSelectedItem(section.items[nextIndex]);
    } 
    // If we have a sub item selected
    else if (selectedItem && selectedSubItem) {
      const subItems = getSubItems(selectedItem);
      let currentIndex = subItems.findIndex((item: any) => item.id === selectedSubItem.id);
      if (currentIndex === -1) currentIndex = 0;
      const nextIndex = (currentIndex + 1) % subItems.length;
      appStore.setSelectedSubItem(subItems[nextIndex]);
    }
    // If we're in left pane (no selection yet)
    else if (!selectedItem) {
      let currentIndex = 0; // Default to first item
      const nextIndex = (currentIndex + 1) % section.items.length;
      appStore.setSelectedItem(section.items[nextIndex]);
    }
  }
  
  function selectCurrentItem() {
    // If we have a sub item selected, we could show more details
    // For now, we'll just ensure the item is properly selected
    if (selectedItem) {
      appStore.setSelectedItem(selectedItem);
    }
  }
  
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
  
  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });
</script>