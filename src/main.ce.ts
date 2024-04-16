/* Since there currently is no way of using vue custom elements without the shadow-dom
the apiCustomElement.ts (https://github.com/vuejs/core/issues/4314#issuecomment-1021393430)
from a community PR is used and adapted to also work with plugins.

We need it to have a custom element without shadow dom,
since otherwise d3.js is not working properly, and with the option for plugins,
so we can use vuetify in the custom element.*/

import { defineCustomElement } from '@/overrides/apiCustomElement'
// import { defineCustomElement } from 'vue'
import GraphEditor from '@/components/GraphEditor.vue'
import vuetify from '@/plugins/vuetify'

customElements.define(
    'graph-editor',
    // defineCustomElement(GraphEditor, { shadowRoot: true, plugins: [vuetify] })
    defineCustomElement(GraphEditor)
)
