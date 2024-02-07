<template>
    <v-app>
        <graph class="graph-container" />
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
