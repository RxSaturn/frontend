import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "./src") }],
    },
    define: {
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    server: {
      host: "127.0.0.1",
    },
    build: {
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        output: {
          assetFileNames: `assets/img/[name][extname]`,
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
        },
      },
    },
  };
});
