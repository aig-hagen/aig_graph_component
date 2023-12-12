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
                            v-model="fileInput"
                            accept=".tgf"
                            label="Trivial Graph Format File"
                            type="file"
                        >
                        </v-file-input>
                    </v-window-item>
                </v-window>
            </v-card-text>
            <v-card-text>
                The import is limited to files in trivial graph format with
                numerical IDs. Importing will <b>replace</b> your current graph.
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    :disabled="!fileInput"
                    @click="readFile()"
                    >OK</v-btn
                >
                <v-btn color="primary" text @click="onClose()">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'import-export',
    data() {
        return {
            dialog: false,
            tab: null,
            fileInput: null,
        }
    },
    emits: ['file-imported'],
    methods: {
        readFile() {
            if (this.fileInput) {
                const reader = new FileReader()
                reader.readAsText(this.fileInput)

                reader.onload = (e) => {
                    console.log('onload')
                    //@ts-ignore
                    this.$emit('file-imported', e.target?.result)
                    this.onClose()
                }

                reader.onerror = (e) => {
                    console.error(
                        //@ts-ignore
                        `Error reading the file ${this.fileInput!.name}: ${
                            e.target?.error
                        }`
                    )
                }
            }
        },
        onClose() {
            this.dialog = false
            this.tab = null
            this.fileInput = null
        },
    },
})
</script>

<style lang="scss">
.heading {
    margin-top: 15px;
}
</style>
