import { defineConfig } from "vite";
// import { createProxyMiddleware } from 'http-proxy-middleware'
// import { createProxy } from "vite-plugin-proxy";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // "/api": "http://localhost:3000",
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react()],
});
