<template>
    <graph class="graph-component-container" />
</template>

<script lang="ts">
import Graph from '~/components/Graph.vue'
export default {
    components: { Graph },
}
</script>

<style scoped>
.graph-component-container {
    width: 100%;
    height: 100%;
}
</style>
