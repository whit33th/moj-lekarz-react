import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@assets": "/src/assets",
      "@api": "/src/api",
      "@services": "/src/api/services",
      "@hooks": "/src/api/hooks",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@utils": "/src/utils",
      "@config": "/src/config",
      "@data": "/src/data",
    },
  },
  plugins: [react()],
});
