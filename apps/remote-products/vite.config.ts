import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === "production"
  const baseName = process.env.VITE_REMOTE_BASE_NAME
  return {
    plugins: [
      vue(),
      federation({
        name: "remote_products",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App.vue",
          "./ProductList": "./src/components/ProductList.vue",
          "./ProductDetail": "./src/components/ProductDetail.vue",
          "./store": "./src/stores/productsStore.ts",
          // "./composables/useProducts": "./src/composables/useProducts.ts",
        },
        shared: {
          vue: "^3.4.0",
          "vue-router": "^4.2.0",
          pinia: "^2.1.0",
          "@mfe-dashboard/shared-ui": "workspace:*",
          "@mfe-dashboard/shared-utils": "workspace:*",
          "@mfe-dashboard/shared-stores": "workspace:*",
          "@mfe-dashboard/shared-api": "workspace:*",
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base: isProd && baseName ? `/${baseName}/` : "/",
    build: {
      target: "esnext",
      minify: true,
      cssCodeSplit: false,
      outDir: "../../dist/remote-products",
      rollupOptions: {
        input: "src/main.ts",
        output: {
          format: "esm",
          entryFileNames: "assets/[name].js",
          chunkFileNames: "assets/[name].js",
        },
      },
    },
    server: {
      port: 5001,
      cors: true,
      strictPort: true,
    },
    preview: {
      port: 5001,
      strictPort: true,
      cors: true,
    },
  }
})
