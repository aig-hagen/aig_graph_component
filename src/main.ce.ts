//@ts-nocheck
import { defineCustomElement } from 'vue'
import { defineCustomElementWrapped } from '@/overrides/custom-element-with-plugin'
import GraphEditor from '@/components/GraphEditor.vue'
import vuetify from '@/plugins/vuetify'
import { defineCustomElement as defineCustomElementToggleShadowRootOption } from '@/overrides/custom-element-remove-shadowroot'

customElements.define(
    'graph-component',
    // Menu Version without CLI functionality
    // defineCustomElementWrapped(GraphEditor, { plugins: [vuetify] })
    // CLI Version with ShadowRoot without LaTeX
    // defineCustomElement(GraphEditor)
    // CLI Version with Latex without ShadowRoot for MathJax to work
    defineCustomElementToggleShadowRootOption(GraphEditor, { shadowRoot: false })
)
