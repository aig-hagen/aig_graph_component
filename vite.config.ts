import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            customElement: false //when running the build script, this has to be set to true
        }),
        vuetify({ autoImport: true })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
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
