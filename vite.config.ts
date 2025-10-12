import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelteTesting } from '@testing-library/svelte/vite'

/**
 * Vite configuration for the Echoes of the Deep project
 *
 * This configuration sets up the build process for the SvelteKit application,
 * including the custom content plugin for processing markdown files.
 */
export default defineConfig({
	plugins: [sveltekit(), svelteTesting()]
});
