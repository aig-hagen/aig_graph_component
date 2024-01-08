<template>
    <v-dialog v-model="dialog" max-width="800px">
        <template #activator="{ on, attrs }">
            <v-tooltip bottom :open-delay="750">
                <template #activator="{ on: onTooltip }">
                    <v-btn
                        icon
                        elevation="6"
                        v-bind="attrs"
                        aria-label="Help"
                        v-on="{ ...on, ...onTooltip }"
                    >
                        <v-icon v-text="'mdi-help'" />
                    </v-btn>
                </template>
                <span>Help</span>
            </v-tooltip>
        </template>
        <v-card>
            <v-card-title class="headline">Controls</v-card-title>
            <v-data-table
                :headers="headers"
                :items="controls"
                hide-default-footer
            />
            <v-card-actions>
                <v-spacer />
                <v-btn
                    text
                    color="primary"
                    aria-label="Close"
                    @click="dialog = false"
                >
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
interface Control {
    action: string
    desktop: string
    mobile: string
}
import { defineComponent } from 'vue'
export default defineComponent({
    data(): { controls: Control[]; dialog: Boolean; headers: any[] } {
        return {
            controls: [
                // {
                //     action: 'Pan',
                //     desktop: 'Left-click',
                //     mobile: 'Multi-touch',
                // },
                // {
                //     action: 'Zoom',
                //     desktop: 'Mouse wheel',
                //     mobile: 'Multi-touch',
                // },
                {
                    action: 'Create node',
                    desktop: 'Double-click',
                    mobile: 'Double-tap',
                },
                {
                    action: 'Move node',
                    desktop: 'Right-click & drag',
                    mobile: 'Long tap & drag',
                },
                {
                    action: 'Create link',
                    desktop: 'Left-click & drag',
                    mobile: 'Touch & drag',
                },
                {
                    action: 'Create/Update label',
                    desktop: 'Left-click on label',
                    mobile: 'Touch',
                },
                {
                    action: 'Delete node/link',
                    desktop: 'Middle-click',
                    mobile: '-',
                }, // still needs testing on mobile
            ],
            dialog: false,
            headers: [
                {
                    text: 'Action',
                    value: 'action',
                    sortable: false,
                },
                {
                    text: 'Desktop',
                    value: 'desktop',
                    sortable: false,
                },
                {
                    text: 'Mobile',
                    value: 'mobile',
                    sortable: false,
                },
            ],
        }
    },
})
</script>

<style lang="scss">
.v-data-table-header-mobile {
    tr:first-child {
        th {
            height: 0 !important;
        }
    }
}
</style>
