import js from '@eslint/js'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { globalIgnores } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'

export default defineConfigWithVueTs(
    {
        name: 'app/files-to-lint',
        files: ['**/*.{vue,js,jsx,cjs,mjs,ts,tsx,cts,mts}']
    },

    globalIgnores([
        '**/dist/**',
        '**/dist-ssr/**',
        '**/coverage/**',
        '**/playwright-report/**',
        '**/test-results/**',
        '**/playwright/.cache/**',
        'public/**',
        'application-examples/**',
        'shims-vue.d.ts',
        'global.d.ts'
    ]),

    js.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,

    skipFormatting
)
