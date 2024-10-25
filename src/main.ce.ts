//@ts-nocheck
import { defineCustomElement } from 'vue'
import GraphEditor from '@/components/GraphEditor.vue'
import { defineCustomElement as defineCustomElementToggleShadowRootOption } from '@/overrides/custom-element-remove-shadowroot'

customElements.define(
    'graph-component',
    // With LaTeX without ShadowRoot for MathJax to work
    defineCustomElementToggleShadowRootOption(GraphEditor, { shadowRoot: false })

    // With ShadowRoot without LaTeX
    // defineCustomElement(GraphEditor)
    /* for switching off the LaTeX control info background, in the graph editor template
    in the graph controls tag you can use :show-latex-info="true" */
)
