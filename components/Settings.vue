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
                <!--                                <v-list-item>-->
                <!--                                    <v-list-item-action>-->
                <!--                                        <v-switch-->
                <!--                                            v-model="nodeLabelsEnabled"-->
                <!--                                            color="primary"-->
                <!--                                            @click="toggleNodeLabels"-->
                <!--                                        ></v-switch>-->
                <!--                                    </v-list-item-action>-->
                <!--                                    <v-list-item-title>Labels</v-list-item-title>-->
                <!--                                </v-list-item>-->

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

                <!--                <v-card-subtitle>Links</v-card-subtitle>-->
                <!--                <v-list-item>-->
                <!--                    <v-list-item-action>-->
                <!--                        <v-switch-->
                <!--                            v-model="linkLabelsEnabled"-->
                <!--                            color="primary"-->
                <!--                            @click="toggleLinkLabels"-->
                <!--                        ></v-switch>-->
                <!--                    </v-list-item-action>-->
                <!--                    <v-list-item-title>Labels</v-list-item-title>-->
                <!--                </v-list-item>-->

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

                <!--                <v-list-item>-->
                <!--                    <v-list-item-action>-->
                <!--                        <v-text-field-->
                <!--                            v-model.number="radius"-->
                <!--                            hide-details-->
                <!--                            single-line-->
                <!--                            type="number"-->
                <!--                        >-->
                <!--                        </v-text-field>-->
                <!--                        &lt;!&ndash;                        <v-slider&ndash;&gt;-->
                <!--                        &lt;!&ndash;                            v-model="radius"&ndash;&gt;-->
                <!--                        &lt;!&ndash;                            color="primary"&ndash;&gt;-->
                <!--                        &lt;!&ndash;                            min="10"&ndash;&gt;-->
                <!--                        &lt;!&ndash;                            max="100"&ndash;&gt;-->
                <!--                        &lt;!&ndash;                            thumb-label&ndash;&gt;-->
                <!--                        &lt;!&ndash;                            width="100"&ndash;&gt;-->
                <!--                        &lt;!&ndash;                        ></v-slider>&ndash;&gt;-->
                <!--                    </v-list-item-action>-->
                <!--                    <v-list-item-title>Radius</v-list-item-title>-->
                <!--                </v-list-item>-->
            </v-list>
        </v-card>
    </v-menu>
</template>
<script lang="ts">
export default {
    emits: [
        'toggle-node-physics',
        // 'toggle-node-labels',
        // 'toggle-link-labels',
        'toggle-fixed-link-distance',
    ],
    data() {
        return {
            menu: false,
            nodeLabelsEnabled: true,
            linkLabelsEnabled: true,
            physicsEnabled: false,
            radius: 24,
            fixedLinkDistanceEnabled: false,
        }
    },
    methods: {
        toggleNodePhysics() {
            this.$emit('toggle-node-physics', this.physicsEnabled)
        },
        // toggleNodeLabels() {
        //     console.log('show labels' + this.nodeLabelsEnabled)
        //     this.$emit('toggle-node-labels', this.nodeLabelsEnabled)
        // },
        // toggleLinkLabels() {
        //     console.log('show labels' + this.linkLabelsEnabled)
        //     this.$emit('toggle-node-labels', this.linkLabelsEnabled)
        // },
        toggleFixedLinkDistance() {
            this.$emit(
                'toggle-fixed-link-distance',
                this.fixedLinkDistanceEnabled
            )
        },
    },
}
</script>
