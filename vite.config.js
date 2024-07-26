import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    react(),
    ViteImagemin({
      // plugin options
    }),
  ],
});
