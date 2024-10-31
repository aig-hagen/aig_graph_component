import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            // custom element mode -> inlines the styles
            // customElement: process.env.NODE_ENV === 'production'
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        host: '0.0.0.0',
        port: 5173
    },
    build: {
        lib: {
            name: 'GraphComponentLib',
            entry: './src/main.ce.ts'
        }
    },
    define: {
        'process.env.NODE_ENV': "'production'"
    }
})
