<script lang="ts">
  import { currentSection, selectedItem } from '$lib/store';
</script>

<footer>
  Section: {$currentSection?.name || 'None'} | Item: {$selectedItem?.title || 'None'}
</footer>