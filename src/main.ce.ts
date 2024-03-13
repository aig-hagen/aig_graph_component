/* Since there currently is no way of using vue custom elements without the shadow-dom
the apiCustomElement.ts (https://github.com/vuejs/core/issues/4314#issuecomment-1021393430)
from a community PR is used. (We need it to have a custom element without shadow dom,
since otherwise d3.js is not working properly.) */

import { defineCustomElement } from '@/external/apiCustomElement'
import GraphEditor from '@/components/GraphEditor.vue'

customElements.define('graph-editor', defineCustomElement(GraphEditor, { shadowRoot: false }))
