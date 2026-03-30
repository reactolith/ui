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
                // Slate (peer deps of @platejs/*, consumers install separately)
                "slate",
                "slate-react",
                "slate-history",
                // Built-in component dependencies
                "sonner",
                "lucide-react",
                "reactolith",
                /^@base-ui\/react/,
                /^@iconify/,
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
