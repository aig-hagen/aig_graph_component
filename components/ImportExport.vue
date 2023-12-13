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
                    <v-tab>Export</v-tab>
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
                        <v-card-text>
                            The import is limited to files in trivial graph
                            format with numerical IDs. Importing will
                            <b>replace</b> your current graph.
                        </v-card-text>
                    </v-window-item>
                    <v-window-item>
                        <h3 class="heading">Preview</h3>
                        <v-spacer />
                        <v-spacer />
                        <pre>{{ graphAsTGF }}</pre>
                        <v-card-text
                            >This export action will <b>copy</b> the graph in
                            trivial graph format to your clipboard.</v-card-text
                        >
                    </v-window-item>
                </v-window>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    :disabled="isOkDisabled"
                    @click="onOk()"
                    >Ok</v-btn
                >
                <v-btn color="primary" text @click="onClose()">Close</v-btn>
            </v-card-actions>
        </v-card>
        <v-snackbar v-model="copySuccessful" :timeout="1500"
            >Copied successful.</v-snackbar
        >
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'import-export',
    props: {
        graphAsTGF: {
            type: String,
            required: true,
        },
    },
    computed: {
        isOkDisabled() {
            return (
                (this.tab === 0 && !this.fileInput) ||
                (this.tab === 1 && this.graphAsTGF === 'Graph is empty')
            )
        },
    },
    data() {
        return {
            dialog: false,
            tab: 0,
            fileInput: null,
            copySuccessful: false,
        }
    },
    emits: ['file-imported'],
    methods: {
        onOk() {
            if (this.tab === 0) {
                this.readFile()
            } else if (this.tab === 1) {
                navigator.clipboard.writeText(this.graphAsTGF).then(
                    () => (this.copySuccessful = true),
                    (error) => console.error('Copy unsuccessful: ', error)
                )
            }
        },
        readFile() {
            if (this.fileInput) {
                const reader = new FileReader()
                reader.readAsText(this.fileInput)

                reader.onload = (e) => {
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
            this.tab = 0
            this.fileInput = null
            this.copySuccessful = false
        },
    },
})
</script>

<style lang="scss">
.heading {
    margin-top: 15px;
}
</style>
