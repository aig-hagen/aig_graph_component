//@ts-nocheck
import { defineCustomElement } from 'vue'
import { defineCustomElementWrapped } from '@/overrides/custom-element-with-plugin'
import GraphEditor from '@/components/GraphEditor.vue'
import vuetify from '@/plugins/vuetify'

customElements.define(
    'graph-editor',
    // GUI Version
    defineCustomElementWrapped(GraphEditor, { plugins: [vuetify] })
    // CLI Version
    // defineCustomElement(GraphEditor)
)
//if for defineCustomElement you need to switch shadow root on and off, you can use the override located in overrides/custom-element-shadowroot.ts
