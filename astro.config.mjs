import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://matt-bp.github.io",
  markdown: {
    shikiConfig: {
      theme: "monokai",
    }
  }
});
