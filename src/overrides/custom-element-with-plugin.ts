//@ts-nocheck
/*Expansion for defineCustomElement using with plugins (like vuetify) as seen here:
https://stackoverflow.com/questions/69808113/how-to-use-vue-router-and-vuex-inside-custom-element-from-root/69820280#69820280
https://stackoverflow.com/questions/76933641/how-can-add-libraries-like-vuetify-inside-of-a-web-component-created-by-vue-3*/

import { defineCustomElement, h, createApp, getCurrentInstance } from 'vue'
export const defineCustomElementWrapped = (component, { plugins = [] } = {}) =>
    defineCustomElement({
        styles: component.styles,
        render: () => h(component),
        setup() {
            const app = createApp()

            // install plugins
            plugins.forEach(app.use)
            app.use(plugins[0])

            const inst = getCurrentInstance()
            Object.assign(inst.appContext, app._context)
            Object.assign(inst.provides, app._context.provides)
        }
    })
