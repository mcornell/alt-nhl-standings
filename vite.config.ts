import { defineConfig } from "vite";

export default defineConfig({
  base: "/nhl/",
  server: {
    proxy: {
      "/nhl-api": {
        target: "https://api-web.nhle.com",
        changeOrigin: true,
        followRedirects: true,
        rewrite: (path) => path.replace(/^\/nhl-api/, ""),
      },
    },
  },
  test: {
    environment: "node",
    exclude: [".features-gen/**", "node_modules/**"],
  },
});
