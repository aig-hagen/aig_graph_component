import { createApp } from 'vue'
import App from './App.vue'

// Graph Component
import '@aig-hagen/graph-component/dist/lib/graph-component.css'
import vuetify from '../plugins/vuetify.ts'

createApp(App).use(vuetify).mount('#app')
