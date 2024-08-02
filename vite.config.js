import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    react(),
    ViteImagemin({
      gifsicle: {
        optimizationLevel: 3,
      },
      optipng: {
        optimizationLevel: 5,
      },
      pngquant: {
        quality: [0.65, 0.9],
      },
      svgo: {
        plugins: [{ removeViewBox: false }, { removeEmptyAttrs: true }],
      },
    }),
  ],
});
