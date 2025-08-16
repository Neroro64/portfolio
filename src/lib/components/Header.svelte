<script lang="ts">
  import { appStore } from '$lib/store';
  
  let { title = 'Echoes of the Deep' } = $props();
</script>

<header>
  <h1>{title}</h1>
</header>