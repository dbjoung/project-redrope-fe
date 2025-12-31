import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  define: {
    global: "window",
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@page": fileURLToPath(new URL("./src/page", import.meta.url)),
      "@widget": fileURLToPath(new URL("./src/widget", import.meta.url)),
      "@feature": fileURLToPath(new URL("./src/feature", import.meta.url)),
      "@entity": fileURLToPath(new URL("./src/entity", import.meta.url)),
      "@share": fileURLToPath(new URL("./src/share", import.meta.url)),
    },
    extensions: [".js", "jsx", ".ts", ".tsx"],
  },
});
