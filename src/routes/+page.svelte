<script>
  /**
   * Main page component for the application.
   * 
   * This component defines the layout of the main content area, which consists
   * of three panels:
   * - NavPanel: Displays navigation sections
   * - ListPanel: Shows items within the selected section
   * - PreviewPanel: Displays detailed information about a selected item
   * 
   * The panels are arranged in a grid layout to create a multi-panel TUI-like interface.
   */
  
  import NavPanel from '$lib/components/NavPanel.svelte';
  import ListPanel from '$lib/components/ListPanel.svelte';
  import PreviewPanel from '$lib/components/PreviewPanel.svelte';
</script>

<div class="panel">
  <NavPanel />
</div>

<div class="panel">
  <ListPanel />
</div>

<div class="panel">
  <PreviewPanel />
</div>