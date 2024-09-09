//@ts-nocheck
import { defineCustomElement } from 'vue'
import { defineCustomElementWrapped } from '@/overrides/custom-element-with-plugin'
import GraphEditor from '@/components/GraphEditor.vue'
import vuetify from '@/plugins/vuetify'
import { defineCustomElement as defineCustomElementWOShadowRoot } from '@/overrides/custom-element-remove-shadowroot'

customElements.define(
    'graph-editor',
    // GUI Version
    // defineCustomElementWrapped(GraphEditor, { plugins: [vuetify] })
    // CLI Version
    // defineCustomElement(GraphEditor)
    // Without ShadowRoot for MathJax to work
    defineCustomElementWOShadowRoot(GraphEditor, { shadowRoot: false })
)
