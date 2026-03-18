import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "node",
    exclude: [".features-gen/**", "node_modules/**"],
  },
});
