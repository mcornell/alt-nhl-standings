import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/nhl-api": {
        target: "https://api-web.nhle.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nhl-api/, ""),
      },
    },
  },
  test: {
    environment: "node",
    exclude: [".features-gen/**", "node_modules/**"],
  },
});
