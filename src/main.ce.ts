import { defineCustomElement } from 'vue'
import GraphEditor from '@/components/GraphEditor.vue'

customElements.define('graph-editor', defineCustomElement(GraphEditor))
//if for defineCustomElement you need to switch shadow root on and off, you can use the override located in overrides/custom-element-shadowroot.ts
