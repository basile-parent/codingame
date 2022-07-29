import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from "vite-tsconfig-paths"
import svgPlugin from "vite-plugin-react-svg"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        tsConfigPaths(),
        react(),
        svgPlugin(),
    ]
})
