import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    react(),
    ViteImagemin({
      verbose: true,
      gifsicle: { optimizationLevel: 3 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 75 },
      svgo: {
        plugins: [{ removeViewBox: false }, { removeEmptyAttrs: false }],
      },
    }),
  ],
});
