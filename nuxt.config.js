module.exports = {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s',
        title: 'Graph Editor',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Simple editor for directed graphs, built with D3.js.',
            },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/stylelint
        '@nuxtjs/stylelint-module',
        // https://go.nuxtjs.dev/vuetify
        ['@nuxtjs/vuetify', { optionsPath: '~/plugins/vuetify.options.ts' }],
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: ['nuxt-custom-elements'],

    // Nuxt custom elements: https://nuxt.com/modules/custom-elements
    customElements: {
        entries: [
            {
                name: 'GraphCustomElement',
                tags: [
                    {
                        name: 'GraphComponent',
                        path: '@/pages/index.vue',
                    },
                ],
            },
        ],
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
}
