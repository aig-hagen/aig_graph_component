//@ts-nocheck
import { defineCustomElement } from 'vue'
import GraphEditor from '@/components/GraphEditor.vue'
import { defineCustomElement as defineCustomElementToggleShadowRootOption } from '@/overrides/custom-element-remove-shadowroot'

customElements.define(
    'graph-component',
    // CLI Version with ShadowRoot without LaTeX
    // defineCustomElement(GraphEditor)
    // CLI Version with LaTeX without ShadowRoot for MathJax to work
    defineCustomElementToggleShadowRootOption(GraphEditor, { shadowRoot: false })
)
