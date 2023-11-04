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
                        <v-text-field
                            v-model.number="radius"
                            hide-details
                            single-line
                            type="number"
                        >
                        </v-text-field>
                        <!--                        <v-slider-->
                        <!--                            v-model="radius"-->
                        <!--                            color="primary"-->
                        <!--                            min="10"-->
                        <!--                            max="100"-->
                        <!--                            thumb-label-->
                        <!--                            width="100"-->
                        <!--                        ></v-slider>-->
                    </v-list-item-action>
                    <v-list-item-title>Radius</v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-action>
                        <v-switch
                            v-model="nodeLabels"
                            color="primary"
                        ></v-switch>
                    </v-list-item-action>
                    <v-list-item-title>Labels</v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-action>
                        <v-switch v-model="physics" color="primary"></v-switch>
                    </v-list-item-action>
                    <v-list-item-title>Physics</v-list-item-title>
                </v-list-item>

                <v-card-subtitle>Links</v-card-subtitle>
                <v-list-item>
                    <v-list-item-action>
                        <v-switch
                            v-model="linkLabels"
                            color="primary"
                        ></v-switch>
                    </v-list-item-action>
                    <v-list-item-title>Labels</v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-action>
                        <v-switch
                            v-model="fixedDistance"
                            color="primary"
                        ></v-switch>
                    </v-list-item-action>
                    <v-list-item-title>Fixed distance</v-list-item-title>
                </v-list-item>
            </v-list>

            <!--            <v-card-actions>-->
            <!--                <v-spacer></v-spacer>-->
            <!--                <v-btn color="primary" text @click="menu = false"> Save </v-btn>-->

            <!--                <v-btn text @click="menu = false"> Cancel </v-btn>-->
            <!--            </v-card-actions>-->
        </v-card>
    </v-menu>
</template>
<script lang="ts">
export default {
    data() {
        return {
            menu: false,
            nodeLabels: true,
            physics: false,
            radius: 24,
            linkLabels: true,
            fixedDistance: false,
        }
    },
}
</script>
