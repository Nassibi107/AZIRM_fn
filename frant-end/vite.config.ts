import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
// https://vitejs.dev/guide/features.html#alias
// https://vitejs.dev/guide/build.html#rollup-plugins


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: ['xlsx'],
    },
  },
});
