import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import url from "url";
// declare let process: { env: Record<string, string>; cwd: () => string };
// const env = loadEnv("all", process.cwd());

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // "/api": "http://localhost:3000",
      "/api": "https://diverse.dev1403.rahnemacollege.ir",
      "/socket.io": {
        //   // target: "ws://localhost:3000",
        //   // target: "ws://5.34.193.100",
        //   target: "ws://diverse.dev1403.rahnemacollege.ir",
        target: "/socket.io",
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@asset": resolve(__dirname, "src/assets"),
      "@component": resolve(__dirname, "src/components"),
    },
  },
});
