<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
    nodeLabelsEnabled: Boolean
    linkLabelsEnabled: Boolean
    physicsEnabled: Boolean
    fixedLinkDistanceEnabled: Boolean
}
const props = defineProps<Props>()

const menu = ref(false)

const emit = defineEmits([
    'toggle-node-physics',
    'toggle-node-labels',
    'toggle-link-labels',
    'toggle-fixed-link-distance'
])

const toggleNodeLabels = computed({
    get: () => props.nodeLabelsEnabled,
    set: (val) => {
        emit('toggle-node-labels', val)
    }
})

const toggleNodePhysics = computed({
    get: () => props.physicsEnabled,
    set: (val) => {
        emit('toggle-node-physics', val)
    }
})

const toggleLinkLabels = computed({
    get: () => props.linkLabelsEnabled,
    set: (val) => {
        emit('toggle-link-labels', val)
    }
})

const toggleFixedLinkDistance = computed({
    get: () => props.fixedLinkDistanceEnabled,
    set: (val) => {
        emit('toggle-fixed-link-distance', val)
    }
})
</script>

<template>
    <v-menu v-model="menu" :close-on-content-click="false" transition="slide-y-transition">
        <template #activator="{ props }">
            <v-tooltip location="bottom" :open-delay="750" text="Settings">
                <template #activator="{ props: onTooltip }">
                    <v-btn
                        aria-label="Settings"
                        class="mx-1"
                        color="grey"
                        density="comfortable"
                        elevation="6"
                        icon="$settings"
                        v-bind="{ ...props, ...onTooltip }"
                        variant="plain"
                    >
                    </v-btn>
                </template>
            </v-tooltip>
        </template>

        <v-card>
            <v-card-title> Settings </v-card-title>
            <v-card-subtitle>Nodes</v-card-subtitle>
            <v-container>
                <v-switch v-model="toggleNodeLabels" color="secondary" label="Labels"></v-switch>
                <v-switch v-model="toggleNodePhysics" color="secondary" label="Physics"></v-switch>
            </v-container>

            <v-card-subtitle>Links</v-card-subtitle>
            <v-container>
                <v-switch v-model="toggleLinkLabels" color="secondary" label="Labels"></v-switch>
                <v-switch
                    v-model="toggleFixedLinkDistance"
                    color="secondary"
                    label="Fixed Distance"
                ></v-switch>
            </v-container>
        </v-card>
    </v-menu>
</template>

<style scoped lang="scss"></style>
