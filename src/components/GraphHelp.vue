<script setup lang="ts">
import { ref } from 'vue'

interface Control {
    action: string
    desktop: string
    mobile: string
}

const controls: Control[] = [
    {
        action: 'Create node',
        desktop: 'Double-click',
        mobile: 'Double-tap'
    },
    {
        action: 'Move node',
        desktop: 'Right-click & drag',
        mobile: 'Long tap & drag'
    },
    {
        action: 'Create link',
        desktop: 'Left-click on node & drag',
        mobile: 'Touch & drag'
    },
    {
        action: 'Create/Update label',
        desktop: 'Left-click on label',
        mobile: 'Touch'
    },
    {
        action: 'Delete node/link',
        desktop: 'Middle-click',
        mobile: 'Multi-touch'
    }, // still needs testing on mobile
    {
        action: 'Pan',
        desktop: 'Left-click & drag',
        mobile: 'Multi-touch'
    },
    {
        action: 'Zoom',
        desktop: 'Mouse wheel',
        mobile: 'Multi-touch'
    }
]

const dialog = ref(false)

const headers: any = ['Action', 'Desktop', 'Mobile']
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
            <v-table density="comfortable" fixed-header>
                <thead>
                    <tr>
                        <th class="text-left">{{ headers[0] }}</th>
                        <th class="text-left">{{ headers[1] }}</th>
                        <th class="text-left">{{ headers[2] }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in controls" :key="item.action">
                        <td>{{ item.action }}</td>
                        <td>{{ item.desktop }}</td>
                        <td>{{ item.mobile }}</td>
                    </tr>
                </tbody>
            </v-table>

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
