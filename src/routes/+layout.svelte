<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Navigation from '$lib/components/Navigation.svelte';
  import NavPanel from '$lib/components/NavPanel.svelte';
  import ListPanel from '$lib/components/ListPanel.svelte';
  import PreviewPanel from '$lib/components/PreviewPanel.svelte';
  import Footer from '$lib/components/Footer.svelte';
  
  let { children } = $props();
</script>

<svelte:head>
  <link rel="stylesheet" href="/src/styles/global.css" />
</svelte:head>

<div class="container">
  <Header title="Echoes of the Deep" />
  
  <Navigation />
  
  <div class="flex flex-col gap-4">
    <NavPanel />
    <ListPanel />
    <PreviewPanel />
  </div>
  
  <Footer />
</div>

{@render children?.()}