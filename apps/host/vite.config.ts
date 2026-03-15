import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      vue(),
      federation({
        name: "host",
        remotes: {
          remote_products:
            mode === "development"
              ? "http://localhost:5001/assets/remoteEntry.js"
              : env.PRODUCTS_REMOTE_URL ||
                "http://localhost:5001/assets/remoteEntry.js",
          // remote_cart:
          //   mode === "development"
          //     ? "http://localhost:5002/assets/remoteEntry.js"
          //     : env.CART_REMOTE_URL ||
          //       "http://localhost:5002/assets/remoteEntry.js",
        },
        shared: {
          vue: "^3.4.0",
          "vue-router": "^4.2.0",
          pinia: "^2.1.0",
          "@mfe-dashboard/shared-ui": "workspace:*",
          "@mfe-dashboard/shared-utils": "workspace:*",
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
        output: {
          format: "esm",
          entryFileNames: "assets/[name].[hash].js",
          chunkFileNames: "assets/[name].[hash].js",
        },
      },
    },
    server: {
      port: 5000,
      cors: true,
      strictPort: true,
    },
    preview: {
      port: 5000,
      strictPort: true,
      cors: true,
    },
  };
});
