<template>
    <v-dialog v-model="dialog" max-width="800px">
        <template #activator="{ on, attrs }">
            <v-btn
                icon
                elevation="6"
                v-bind="attrs"
                aria-label="Import"
                v-on="on"
            >
                <v-icon v-text="'mdi-file-import-outline'" />
            </v-btn>
        </template>

        <v-card>
            <v-card-title>
                <v-tabs v-model="tab">
                    <v-tab>Import</v-tab>
                </v-tabs>
            </v-card-title>
            <v-card-text>
                <v-window v-model="tab" class="ml-4">
                    <v-window-item>
                        <h3 class="heading">Select File</h3>
                        <v-file-input
                            accept=".tgf"
                            label="Graph Format File"
                            ref="file"
                            type="file"
                        >
                        </v-file-input>
                    </v-window-item>
                </v-window>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text>OK</v-btn>
                <v-btn color="primary" text @click="onClose()">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
export default {
    data() {
        return {
            dialog: false,
            tab: null,
            file: null,
            content: null,
        }
    },
    methods: {
        onClose() {
            //@ts-ignore
            this.dialog = false
            //@ts-ignore
            this.tab = null
        },
    },
}
</script>

<style lang="scss">
.heading {
    margin-top: 15px;
}
</style>
