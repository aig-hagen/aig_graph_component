/* Since there currently is no way of using vue custom elements without the shadow-dom
the vue3-webcomponent-wrapper (from the community) is used
until official support (https://github.com/vuejs/vue-web-component-wrapper/issues/93).
(We need it to use without shadow dom, since otherwise d3.js is not working properly.)*/

import { createApp, h } from "vue";
//@ts-ignore
import wrapper from "vue3-webcomponent-wrapper";
import GraphEditor from "@/components/GraphEditor.vue";

const CustomElement = wrapper(GraphEditor, createApp, h);
window.customElements.define("graph-editor", CustomElement);