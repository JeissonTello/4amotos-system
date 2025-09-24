import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: { port: 5173, open: true },
	build: { target: 'es2020' },
	test: { include: ['src/**/*.{test,spec}.{js,ts}'] }
});
