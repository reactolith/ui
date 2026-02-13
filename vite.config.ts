import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig(() => {
    const base = process.env.GITHUB_PAGES ? "/ui/" : "/"
    return {
        base,
        plugins: [
            react(),
            tailwindcss(),
        ],
        root: 'app',
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./"),
            },
        },
    }
})
