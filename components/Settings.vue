<template>
    <v-menu
        v-model="menu"
        rounded
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                elevation="6"
                v-bind="attrs"
                aria-label="Settings"
                v-on="on"
            >
                <v-icon v-text="'mdi-cog-outline'" />
            </v-btn>
        </template>

        <v-card>
            <v-card-title> Settings </v-card-title>

            <v-divider></v-divider>

            <v-list>
                <v-card-subtitle>Nodes</v-card-subtitle>

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
            </v-list>
        </v-card>
    </v-menu>
</template>
<script lang="ts">
export default {
    emits: ['toggle-node-physics'],
    data() {
        return {
            menu: false,
            nodeLabels: true,
            physicsEnabled: false,
            physicsEnabledTest: false,
            radius: 24,
            linkLabels: true,
            fixedDistance: false,
        }
    },
    methods: {
        toggleNodePhysics() {
            this.$emit('toggle-node-physics', this.physicsEnabled)
        },
    },
}
</script>
