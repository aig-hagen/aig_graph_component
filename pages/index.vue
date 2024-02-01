<template>
    <v-app>
        <graph class="graph-container" :has-toolbar="hasToolbar" />
    </v-app>
</template>

<script>
import Vue from 'vue'
import VueMeta from 'vue-meta'
import Graph from '~/components/Graph.vue'
import vuetify from '~/plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(VueMeta)

export default {
    vuetify,
    components: { Graph },
    created() {
        const { set } = this.$meta().addApp('graph-component')
        set({
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css',
                },
            ],
        })
    },
    /* These props represent initial settings as used in the graph component. They are additionally defined here to be
    accessible in the web component that is generated during production build (customElements in nuxt.config.js). */
    props: {
        hasToolbar: {
            type: Boolean,
            default: true,
        },
    },
}
</script>

<style lang="scss">
@import 'vuetify/dist/vuetify.min.css';
.graph-container {
    width: 100%;
    height: 100%;
}
</style>
<style scoped>
div {
    font-family: Roboto, sans-serif;
}
</style>
