import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    server: {
        host: "0.0.0.0",
        port: 5173,
        hmr: {
            host: "localhost", // browser connects here
        },
        watch: {
            usePolling: true, // 👈 this makes Vite see file changes in Docker
            interval: 300, // 👈 check every 300ms (adjust if needed)
        },
    },
    plugins: [
        laravel({
            input: ["resources/js/app.jsx"],
            refresh: true,
        }),
        react(),
    ],
});
