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
        },
        rollupOptions: {
            // externalize Vue
            // See https://vite.dev/guide/build#library-mode
            external: ['vue'],
            // global variables to use in the UMD build for externalized deps
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
    define: {
        'process.env.NODE_ENV': "'production'"
    }
})
