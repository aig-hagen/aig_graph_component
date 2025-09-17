//@ts-nocheck
import { defineCustomElement } from 'vue'
import GraphEditor from '@/components/GraphComponent.vue'

customElements.define(
    'graph-component',
    // With LaTeX without ShadowRoot for MathJax to work
    defineCustomElement(GraphEditor, { shadowRoot: false })

    // With ShadowRoot without LaTeX
    // defineCustomElement(GraphEditor)
    /* for switching off the LaTeX control info background, in the graph editor template
    in the graph controls tag you can use :show-latex-info="true" */
)
