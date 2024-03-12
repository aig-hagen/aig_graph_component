import { defineCustomElement } from 'vue'
import GraphEditor from '@/components/GraphEditor.ce.vue'
const MyGraphEditor = defineCustomElement(GraphEditor)

customElements.define('graph-editor', MyGraphEditor)