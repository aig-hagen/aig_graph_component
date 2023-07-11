<template>
    <v-dialog v-model="dialog" max-width="800px">
        <template #activator="{ on, attrs }">
            <v-btn
                icon
                elevation="6"
                v-bind="attrs"
                aria-label="Save"
                v-on="on"
            >
                <v-icon v-text="'mdi-content-save-outline'" />
            </v-btn>
        </template>
        <v-card>
            <v-card-title>Save as TGF</v-card-title>
            <v-card-text>
                <pre>{{ text }}</pre>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="copyText()">Copy</v-btn>
                <v-btn color="primary" text @click="onClose()">Close</v-btn>
            </v-card-actions>
        </v-card>
        <v-snackbar v-model="copySuccessful" :timeout="1500"
            >Copied successful.</v-snackbar
        >
    </v-dialog>
</template>

<script lang="ts">
export default {
    props: {
        text: {
            type: '',
            required: true,
        },
    },
    data() {
        return {
            dialog: false,
            copySuccessful: false,
        }
    },
    methods: {
        copyText() {
            navigator.clipboard.writeText(this.text).then(
                () => (this.copySuccessful = true),
                (error) => console.log('Copy unsuccessful: ', error)
            )
        },
        onClose() {
            this.dialog = false
            this.copySuccessful = false
        },
    },
}
</script>
