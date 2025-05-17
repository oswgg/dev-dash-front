import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig({
    plugins: [svgr(),react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        host: true, // o '0.0.0.0'
        port: 5173, // o cualquier otro puerto que estés usando
    },
})
