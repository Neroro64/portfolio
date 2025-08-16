import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { contentPlugin } from './vite.content-plugin';

export default defineConfig({
	plugins: [contentPlugin(), sveltekit()]
});
