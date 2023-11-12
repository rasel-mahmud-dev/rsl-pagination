import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";

export default defineConfig((conf) => ({
  plugins: [react()],
  optimizeDeps: {
    // link: ['vite-react-ts-components'],
  },
  build: {
    sourcemap: true,
  },
  resolve: {
    alias:
      conf.command === "build"
        ? {}
        : {
            "rsl-pagination": path.resolve(
              __dirname,
              "../../packages/rsl-pagination/src/"
            ),
          },
  },
}));
