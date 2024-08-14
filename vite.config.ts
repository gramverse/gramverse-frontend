import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const apiHost = "http://5.34.193.118:3000";
// const apiHost = "http://localhost:3000"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/users": apiHost,
      "/files": apiHost,
    },
  },
});
