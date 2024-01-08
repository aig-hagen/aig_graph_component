<template>
    <v-menu
        v-model="menu"
        rounded
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
    >
        <template #activator="{ on, attrs }">
            <v-tooltip bottom :open-delay="750">
                <template #activator="{ on: onTooltip }">
                    <v-btn
                        icon
                        elevation="6"
                        v-bind="attrs"
                        aria-label="Settings"
                        v-on="{ ...on, ...onTooltip }"
                    >
                        <v-icon v-text="'mdi-cog-outline'" />
                    </v-btn>
                </template>
                <span>Settings</span>
            </v-tooltip>
        </template>

        <v-card>
            <v-card-title> Settings </v-card-title>

            <v-divider></v-divider>

            <v-list>
                <v-card-subtitle>Nodes</v-card-subtitle>
                <v-list-item>
                    <v-list-item-action>
                        <v-switch
                            v-model="nodeLabelsEnabled"
                            color="primary"
                            @click="toggleNodeLabels"
                        ></v-switch>
                    </v-list-item-action>
                    <v-list-item-title>Labels</v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-action>
                        <v-switch
                            v-model="physicsEnabled"
                            color="primary"
                            @click="toggleNodePhysics"
                        ></v-switch>
                    </v-list-item-action>
                    <v-list-item-title>Physics</v-list-item-title>
                </v-list-item>

                <v-card-subtitle>Links</v-card-subtitle>
                <v-list-item>
                    <v-list-item-action>
                        <v-switch
                            v-model="linkLabelsEnabled"
                            color="primary"
                            @click="toggleLinkLabels"
                        ></v-switch>
                    </v-list-item-action>
                    <v-list-item-title>Labels</v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-action>
                        <v-switch
                            v-model="fixedLinkDistanceEnabled"
                            color="primary"
                            @click="toggleFixedLinkDistance"
                        ></v-switch>
                    </v-list-item-action>
                    <v-list-item-title>Fixed distance</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-card>
    </v-menu>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    emits: [
        'toggle-node-physics',
        'toggle-node-labels',
        'toggle-link-labels',
        'toggle-fixed-link-distance',
    ],
    props: {
        nodeLabelsEnabled: {
            type: Boolean,
        },
        linkLabelsEnabled: {
            type: Boolean,
        },
        physicsEnabled: {
            type: Boolean,
        },
        fixedLinkDistanceEnabled: {
            type: Boolean,
        },
    },
    data() {
        return {
            menu: false,
        }
    },
    methods: {
        toggleNodePhysics() {
            this.$emit('toggle-node-physics', this.physicsEnabled)
        },
        toggleNodeLabels() {
            this.$emit('toggle-node-labels', this.nodeLabelsEnabled)
        },
        toggleLinkLabels() {
            this.$emit('toggle-link-labels', this.linkLabelsEnabled)
        },
        toggleFixedLinkDistance() {
            this.$emit(
                'toggle-fixed-link-distance',
                this.fixedLinkDistanceEnabled
            )
        },
    },
})
</script>
