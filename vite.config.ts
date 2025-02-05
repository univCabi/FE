import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: { find: "@", replacement: resolve(__dirname, "src") },
  },
  plugins: [react(), svgr(), tsconfigPaths()],
  server: {
    watch: {
      usePolling: true, // 파일 변경 감지 활성화
    },
  },
});
