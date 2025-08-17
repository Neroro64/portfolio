import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/**
 * SvelteKit configuration for the Echoes of the Deep project
 * 
 * This configuration sets up the SvelteKit application with:
 * - Vite preprocessing for Svelte files
 * - Node.js adapter for server-side rendering
 * - Custom alias for TypeScript types
 */
const config: import('@sveltejs/kit').Config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
				'$types': './src/types'
		}
	}
};

export default config;