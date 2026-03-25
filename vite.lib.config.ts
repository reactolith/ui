import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts"

export default defineConfig({
    plugins: [
        react(),
        dts({
            include: ["index.ts", "lib/**/*.ts", "lib/**/*.tsx"],
            outDir: "dist",
            rollupTypes: true,
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, "index.ts"),
            formats: ["es", "cjs"],
            fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`,
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
