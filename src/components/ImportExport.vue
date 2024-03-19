<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
    graphAsTgf: String
}
const props = defineProps<Props>()

const emit = defineEmits(['file-imported'])

const dialog = ref(false)
const tab = ref(0)
const fileInput = ref<File[]>()
const copySuccessful = ref(false)

const isSubmittable = computed(
    () =>
        (tab.value === 0 &&
            fileInput?.value &&
            fileInput?.value[0]?.name.toLowerCase().endsWith('.tgf')) ||
        (tab.value === 1 && props.graphAsTgf !== 'Graph is empty')
)

const fileInputRules = [
    (value: any) => !!value[0] || 'File is required',
    (value: any) =>
        !value ||
        /\.(tgf|TGF)$/.test(value[0]?.name) ||
        'Invalid file format. Please select a .tgf file.'
]

function readFile() {
    if (fileInput?.value) {
        const reader = new FileReader()
        for (let file of fileInput.value) {
            reader.readAsText(file)

            reader.onload = (e) => {
                emit('file-imported', e.target?.result)
                onClose()
            }

            reader.onerror = (e) => {
                console.error(
                    //@ts-ignore
                    `Error reading the file ${fileInput!.name}: ${e.target?.error}`
                )
            }
        }
    }
}

function onOk() {
    if (tab.value === 0) {
        readFile()
    } else if (tab.value === 1) {
        navigator.clipboard.writeText(props.graphAsTgf.toString()).then(
            () => (copySuccessful.value = true),
            (error) => console.error('Copy unsuccessful: ', error)
        )
    }
}

function onClose() {
    dialog.value = false
    tab.value = 0
    fileInput.value = undefined
    copySuccessful.value = false
}
</script>

<template>
    <v-dialog v-model="dialog" max-width="800px">
        <template #activator="{ props }">
            <v-tooltip location="bottom" :open-delay="750" text="Import/Export">
                <template #activator="{ props: onTooltip }">
                    <v-btn
                        aria-label="Import"
                        class="mx-1"
                        color="grey"
                        density="comfortable"
                        elevation="6"
                        icon="$importExport"
                        v-bind="{ ...props, ...onTooltip }"
                        variant="plain"
                    >
                    </v-btn>
                </template>
            </v-tooltip>
        </template>

        <v-card>
            <v-card-title>
                <v-tabs v-model="tab">
                    <v-tab color="secondary" density="compact" variant="elevated">Import</v-tab>
                    <v-tab color="secondary" density="compact" variant="elevated">Export</v-tab>
                </v-tabs>
            </v-card-title>
            <v-card-text>
                <v-window v-model="tab" class="ml-4">
                    <v-window-item>
                        <h3 class="heading">Select File</h3>
                        <v-file-input
                            v-model="fileInput"
                            accept=".tgf"
                            density="compact"
                            label="Trivial Graph Format File"
                            :rules="fileInputRules"
                            type="file"
                            variant="solo"
                        >
                        </v-file-input>
                        <v-card-text>
                            The import is limited to files in trivial graph format. Importing will
                            <b>replace</b> your current graph.
                        </v-card-text>
                    </v-window-item>
                    <v-window-item>
                        <h3 class="heading">Preview</h3>
                        <pre>{{ props.graphAsTgf }}</pre>
                        <v-card-text
                            >This export action will <b>copy</b> the graph in trivial graph format
                            to your clipboard.</v-card-text
                        >
                    </v-window-item>
                </v-window>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" variant="text" :disabled="!isSubmittable" @click="onOk()"
                    >Ok</v-btn
                >
                <v-btn color="secondary" variant="text" @click="onClose()">Close</v-btn>
            </v-card-actions>
        </v-card>
        <v-snackbar v-model="copySuccessful" :timeout="1500">Copied successful.</v-snackbar>
    </v-dialog>
</template>

<style lang="scss">
.heading {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
