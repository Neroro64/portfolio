<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import NavPanel from '$lib/components/NavPanel.svelte';
  import ListPanel from '$lib/components/ListPanel.svelte';
  import PreviewPanel from '$lib/components/PreviewPanel.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Navigation from '$lib/components/Navigation.svelte';
  import KeyboardHandler from '$lib/components/KeyboardHandler.svelte';
  
  let { children } = $props();
</script>

<svelte:head>
  <link rel="stylesheet" href="/src/styles/global.css" />
</svelte:head>

<div class="container">
  <Header title="Echoes of the Deep" />
  
  <Navigation />
  
  <KeyboardHandler />
  
  <div class="flex gap-4 mt-4">
    <NavPanel />      <!-- Left Panel: Navigation sections -->
    <ListPanel />     <!-- Middle Panel: List of items -->
    <PreviewPanel />  <!-- Right Panel: Preview of selected item -->
  </div>
  
  <Footer />
</div>

{@render children?.()}