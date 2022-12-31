import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig(() => ({
	server: {
		port: 4200,
		open: true,
	},
	base: './',
	build: { outDir: './dist' },
	plugins: [react(), eslintPlugin()],
	resolve: { alias: { '@/styles': path.resolve(__dirname, 'src', 'styles') } },
}));
