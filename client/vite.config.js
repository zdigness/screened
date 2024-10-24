import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			// Proxy all API requests (adjust the path if needed)
			'/api': {
				target: 'http://node:5000', // Use the service name defined in Docker Compose (not localhost)
				changeOrigin: true,
				secure: false,
			},
		},
		host: true, // This allows the server to listen on all network interfaces (0.0.0.0)
		port: 5173, // Vite's development server port
		watch: {
			usePolling: true, // Necessary for file changes in Docker
		},
		hmr: {
			clientPort: 5173, // Vite's development server port
		},
	},
});
