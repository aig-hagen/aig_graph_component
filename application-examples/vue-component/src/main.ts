import { createApp } from 'vue'
import App from './App.vue'

// Graph Component
import { GraphComponent } from '../dependencies/graph-component/graph-component.js'
import '../dependencies/graph-component/graph-component.css'

createApp(App).component('GraphComponent', GraphComponent).mount('#app')
