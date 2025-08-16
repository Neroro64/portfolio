<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import LeftPane from '$lib/components/LeftPane.svelte';
  import MiddlePane from '$lib/components/MiddlePane.svelte';
  import RightPane from '$lib/components/RightPane.svelte';
  import Footer from '$lib/components/Footer.svelte';
  
  let { children } = $props();
</script>

<svelte:head>
  <link rel="stylesheet" href="/src/styles/global.css" />
</svelte:head>

<div class="container">
  <Header title="Echoes of the Deep" />
  
  <div class="flex flex-row gap-4 mt-4">
    <LeftPane />
    <MiddlePane />
    <RightPane />
  </div>
  
  <Footer />
</div>

{@render children?.()}