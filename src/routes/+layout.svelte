<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import KeyboardHandler from "$lib/components/KeyboardHandler.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <title>Echoes of the Deep</title>
  <link rel="stylesheet" href="/src/styles/global.css" />
</svelte:head>

<Header title="Echoes of the Deep" />

<main class="container">
  {@render children()}
</main>

<Footer />
<KeyboardHandler />