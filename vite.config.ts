import { fileURLToPath, URL } from 'node:url'

import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }): UserConfig => {
    if (command === 'build') {
        if (mode === 'lib') {
            return {
                plugins: [
                    vue(),
                    dts({
                        tsconfigPath: './tsconfig.app.json',
                        outDir: './dist/lib/types'
                    })
                ],
                resolve: {
                    alias: {
                        '@': fileURLToPath(new URL('./src', import.meta.url))
                    }
                },
                build: {
                    outDir: './dist/lib',
                    lib: {
                        name: 'GraphComponentLib',
                        entry: './src/main.lib.js'
                    },
                    rollupOptions: {
                        external: ['vue'],
                        output: {
                            globals: { vue: 'Vue' }
                        }
                    }
                }
            }
        } else {
            //custom element
            return {
                plugins: [
                    vue({
                        // custom element mode -> inlines the style: https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#using-vue-sfcs-as-custom-elements
                        // customElement: process.env.NODE_ENV === 'production'
                    })
                ],
                resolve: {
                    alias: {
                        '@': fileURLToPath(new URL('./src', import.meta.url))
                    }
                },
                build: {
                    outDir: './dist/ce',
                    lib: {
                        name: 'GraphComponentCE',
                        entry: './src/main.ce.ts'
                    }
                },
                define: {
                    'process.env.NODE_ENV': "'production'"
                }
            }
        }
    } else {
        //dev
        return {
            plugins: [vue()],
            resolve: {
                alias: {
                    '@': fileURLToPath(new URL('./src', import.meta.url))
                }
            },
            server: {
                host: '0.0.0.0',
                port: 5173
            }
        }
    }
})
