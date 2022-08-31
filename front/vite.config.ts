import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from "vite-tsconfig-paths"
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        tsConfigPaths(),
        react(),
        svgr({
            svgrOptions: { icon: true}
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                admin: resolve(__dirname, 'admin.html'),
                presentation: resolve(__dirname, 'presentation.html'),
            }
        }
    }
})
