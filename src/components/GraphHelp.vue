<script setup lang="ts">
import { ref } from 'vue'
import GraphControls from '@/components/GraphControls.vue'

const dialog = ref(false)
</script>

<template>
    <v-dialog v-model="dialog" max-width="800px">
        <template #activator="{ props }">
            <v-tooltip location="bottom" :open-delay="750" text="Help">
                <template #activator="{ props: onTooltip }">
                    <v-btn
                        aria-label="Help"
                        class="mx-1"
                        color="grey"
                        density="comfortable"
                        icon="$help"
                        elevation="6"
                        v-bind="{ ...props, ...onTooltip }"
                        variant="plain"
                    >
                    </v-btn>
                </template>
            </v-tooltip>
        </template>
        <v-card>
            <v-card-title class="card-header">Controls</v-card-title>
            <graph-controls
                show-controls-environment
                show-header
                show-controls-graph
                show-latex-info
            ></graph-controls>

            <v-card-actions>
                <v-spacer />
                <v-btn
                    aria-label="Close"
                    color="secondary"
                    density="compact"
                    variant="text"
                    @click="dialog = false"
                >
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped lang="scss">
.v-data-table-header-mobile {
    tr:first-child {
        th {
            height: 0 !important;
        }
    }
}
</style>
