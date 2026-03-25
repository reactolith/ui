import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts"

export default defineConfig({
    plugins: [
        react(),
        dts({
            include: ["index.ts", "editor.ts", "recharts.ts", "lib/**/*.ts", "lib/**/*.tsx"],
            outDir: "dist",
            rollupTypes: true,
        }),
    ],
    build: {
        lib: {
            entry: {
                index: path.resolve(__dirname, "index.ts"),
                editor: path.resolve(__dirname, "editor.ts"),
                recharts: path.resolve(__dirname, "recharts.ts"),
            },
            formats: ["es", "cjs"],
            fileName: (format, entryName) => `${entryName}.${format === "es" ? "mjs" : "cjs"}`,
        },
        rollupOptions: {
            external: [
                "react",
                "react-dom",
                "react/jsx-runtime",
                "recharts",
                // Plate.js editor (consumers install separately)
                "platejs",
                "platejs/react",
                "platejs/static",
                /^@platejs\//,
                // Built-in component dependencies (consumers have these via shadcn)
                "sonner",
                "lucide-react",
                /^@base-ui\/react/,
            ],
        },
        outDir: "dist",
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./"),
        },
    },
})
