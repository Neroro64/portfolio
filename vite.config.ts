import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { contentPlugin } from './vite.content-plugin';

/**
 * Vite configuration for the Echoes of the Deep project
 * 
 * This configuration sets up the build process for the SvelteKit application,
 * including the custom content plugin for processing markdown files.
 */
export default defineConfig({
	plugins: [contentPlugin(), sveltekit()]
});