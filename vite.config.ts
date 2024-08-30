import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

declare var process: { env: Record<string, string>, cwd: () => string };
const env = loadEnv('all', process.cwd())

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": env.VITE_API_HOST || "http://5.34.193.118",
    },
  },
});
