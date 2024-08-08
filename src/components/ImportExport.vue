<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
    graphAsTgf: String
    graphAsJson: String
}
const props = defineProps<Props>()

const emit = defineEmits(['file-imported'])

const dialog = ref(false)
const tab = ref(0)
const fileInput = ref<File[]>()
const exportFormat = ref('JSON')

const copySuccessful = ref(false)
const hasError = ref(false)
const errorTitle = ref('')
const errorMsg = ref('')

const isSubmittable = computed(
    () =>
        (tab.value === 0 &&
            fileInput?.value &&
            (fileInput?.value[0]?.name.toLowerCase().endsWith('.tgf') ||
                fileInput?.value[0]?.name.toLowerCase().endsWith('.json'))) ||
        (tab.value === 1 && props.graphAsTgf !== 'Graph is empty')
)

const fileInputRules = [
    (value: any) => !!value[0] || 'File is required',
    (value: any) =>
        !value ||
        /\.(tgf|TGF|json|JSON)$/.test(value[0]?.name) ||
        'Invalid file format. Please select a .tgf or .json file.'
]

function readFile() {
    if (fileInput?.value) {
        const reader = new FileReader()
        for (let file of fileInput.value) {
            const fileExtension = file.name.split('.').pop()?.toLowerCase()
            reader.readAsText(file)

            reader.onload = (e) => {
                if (fileExtension === 'tgf') {
                    emit('file-imported', e.target?.result)
                } else if (fileExtension === 'json') {
                    try {
                        emit('file-imported', JSON.parse(<string>e.target?.result))
                    } catch (error) {
                        showError('Error parsing JSON', error)
                        console.error('Error parsing JSON:' + error)
                        //TODO improve error handling, since it doesn't work correctly in CE Version
                    }
                }

                if (!hasError.value) {
                    onClose()
                }
            }

            reader.onerror = (e) => {
                showError(`Error reading the imported file`, e.target?.error)
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
        navigator.clipboard
            .writeText(
                exportFormat.value === 'TGF'
                    ? props.graphAsTgf.toString()
                    : props.graphAsJson.toString()
            )
            .then(
                () => (copySuccessful.value = true),
                (error) => {
                    showError(`Copy unsuccessful`, error)
                    console.error('Copy unsuccessful: ', error)
                }
            )
    }
}

function onClose() {
    hasError.value = false
    errorTitle.value = ''
    errorMsg.value = ''
    dialog.value = false
    tab.value = 0
    fileInput.value = undefined
    copySuccessful.value = false
}

function showError(title: string, message: any) {
    hasError.value = true
    errorTitle.value = title
    errorMsg.value = message.toString()
    window.setInterval(() => (hasError.value = false), 5000)
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
                            accept=".tgf, .json"
                            density="compact"
                            label="Graph Format File"
                            :rules="fileInputRules"
                            type="file"
                            variant="solo"
                        >
                        </v-file-input>
                        <v-card-text>
                            <p>
                                Files in a specific JSON format or trivial graph format are
                                supported.
                            </p>
                            <p>Importing will <strong>replace</strong> your current graph.</p>
                        </v-card-text>
                    </v-window-item>
                    <v-window-item>
                        <h3 class="heading">Select Format</h3>
                        <v-radio-group inline v-model="exportFormat">
                            <v-radio label="JSON" value="JSON"></v-radio>
                            <v-radio label="TGF" value="TGF"></v-radio>
                        </v-radio-group>
                        <h3 class="heading">Preview</h3>
                        <pre v-show="exportFormat === 'JSON'">{{ props.graphAsJson }}</pre>
                        <pre v-show="exportFormat === 'TGF'">{{ props.graphAsTgf }}</pre>
                        <v-card-text
                            >This export action will <strong>copy</strong> the graph as JSON or in
                            trivial graph format to your clipboard.</v-card-text
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
        <v-snackbar v-model="hasError" :timeout="3000" color="error" variant="tonal">
            <v-row align="center">
                <v-icon icon="$error" class="ml-2"></v-icon>
                <v-col>
                    <h4>{{ errorTitle }}</h4>
                    <p>{{ errorMsg }}</p>
                </v-col>
            </v-row>
        </v-snackbar>
        <v-snackbar v-model="copySuccessful" :timeout="1500">
            <v-icon color="secondary" icon="$success"></v-icon>
            Copied successful.</v-snackbar
        >
    </v-dialog>
</template>

<style lang="scss">
.heading {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
