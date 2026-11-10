import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    plugins: [
      vue(),
      federation({
        name: "host",
        remotes: {
          remote_products:
            mode === "development"
              ? "http://localhost:5001/assets/remoteEntry.js"
              : "/mfe-dashboard-monorepo/remote-products/assets/remoteEntry.js",
          remote_sales_graph:
            mode === "development"
              ? "http://localhost:5002/assets/remoteEntry.js"
              : "/mfe-dashboard-monorepo/remote-sales-graph/assets/remoteEntry.js",
          remote_weather:
            mode === "development"
              ? "http://localhost:5003/assets/remoteEntry.js"
              : "/mfe-dashboard-monorepo/remote-weather/assets/remoteEntry.js",
          remote_currency_rate:
            mode === "development"
              ? "http://localhost:5004/assets/remoteEntry.js"
              : "/mfe-dashboard-monorepo/remote-currency-rate/assets/remoteEntry.js",
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
    base: isProd ? "/mfe-dashboard-monorepo/" : "/",
    build: {
      target: "esnext",
      minify: true,
      cssCodeSplit: false,
      outDir: "../../dist",
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
