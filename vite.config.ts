import path from "path"
import { readdirSync } from "fs"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

function getHtmlInputs() {
    const inputs: Record<string, string> = {
        main: path.resolve(__dirname, "app/index.html"),
        "docs-introduction": path.resolve(__dirname, "app/docs/introduction.html"),
        "docs-installation": path.resolve(__dirname, "app/docs/installation.html"),
        "docs-usage": path.resolve(__dirname, "app/docs/usage.html"),
    }

    const componentsDir = path.resolve(__dirname, "app/docs/components")
    try {
        for (const file of readdirSync(componentsDir)) {
            if (file.endsWith(".html")) {
                const name = file.replace(".html", "")
                inputs[`docs-components-${name}`] = path.resolve(componentsDir, file)
            }
        }
    } catch {
        // Components dir may not exist yet
    }

    return inputs
}

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
        build: {
            rollupOptions: {
                input: getHtmlInputs(),
            },
        },
    }
})
