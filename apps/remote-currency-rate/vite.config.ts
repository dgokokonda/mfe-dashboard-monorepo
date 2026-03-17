import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "remote_weather",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.vue",
        "./CurrencyRate": "./src/components/CurrencyRate.vue",
      },
      shared: {
        vue: "^3.4.0",
        "vue-router": "^4.2.0",
        pinia: "^2.1.0",
        "@mfe-dashboard/shared-ui": "workspace:*",
        "@mfe-dashboard/shared-utils": "workspace:*",
        "@mfe-dashboard/shared-stores": "workspace:*",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    minify: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: "src/main.ts",
      output: {
        format: "esm",
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
      },
    },
  },
  server: {
    port: 5004,
    cors: true,
    strictPort: true,
  },
  preview: {
    port: 5004,
    strictPort: true,
    cors: true,
  },
});
