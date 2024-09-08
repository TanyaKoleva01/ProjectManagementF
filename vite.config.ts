import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable React Router's client-side routing
    rollupOptions: {
      output: {
        manualChunks: {
          reactRouter: ["react-router-dom"],
        },
      },
    },
  },
});
