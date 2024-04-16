import { createApp } from 'vue'
import GraphEditor from '@/components/GraphEditor.vue'
import vuetify from '@/plugins/vuetify'

createApp(GraphEditor).use(vuetify).mount('#app')
