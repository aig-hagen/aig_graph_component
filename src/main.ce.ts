//@ts-nocheck
import { defineCustomElement } from 'vue'
import { defineCustomElementWrapped } from '@/overrides/custom-element-with-plugin'
import GraphEditor from '@/components/GraphEditor.vue'
import vuetify from '@/plugins/vuetify'
import { defineCustomElement as defineCustomElementToggleShadowRootOption } from '@/overrides/custom-element-remove-shadowroot'

customElements.define(
    'graph-component',
    // GUI Version
    // defineCustomElementWrapped(GraphEditor, { plugins: [vuetify] })
    // CLI Version
    // defineCustomElement(GraphEditor)
    // Without ShadowRoot for MathJax to work
    defineCustomElementToggleShadowRootOption(GraphEditor, { shadowRoot: false })
)
