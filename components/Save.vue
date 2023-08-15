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
        <!--        <v-card>-->
        <!--            <v-tabs v-model="tab" bg-color="primary">-->
        <!--                <v-tab>Item One</v-tab>-->
        <!--                <v-tab>Item Two</v-tab>-->
        <!--                <v-tab>Item Three</v-tab>-->
        <!--            </v-tabs>-->

        <!--            <v-card-text>-->
        <!--                <v-window v-model="tab">-->
        <!--                    <v-window-item> One </v-window-item>-->

        <!--                    <v-window-item> Two </v-window-item>-->

        <!--                    <v-window-item> Three </v-window-item>-->
        <!--                </v-window>-->
        <!--            </v-card-text>-->
        <v-card>
            <v-card-title>
                <v-tabs v-model="tab"
                    ><v-tab>Save as TGF</v-tab
                    ><v-tab>Save as TikZ</v-tab></v-tabs
                >
            </v-card-title>
            <v-card-text>
                <v-window v-model="tab" class="ml-4">
                    <v-window-item>
                        <pre>{{ graphAsTGF }}</pre>
                    </v-window-item>
                    <v-window-item>
                        <pre>{{ graphAsTikZ }}</pre>
                    </v-window-item>
                </v-window>
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
        graphAsTGF: {
            type: '',
            required: true,
        },
        graphAsTikZ: {
            type: '',
            required: true,
        },
    },
    data() {
        return {
            dialog: false,
            tab: null,
            copySuccessful: false,
        }
    },
    methods: {
        copyText() {
            let textToCopy = ''
            if (this.tab === 0) {
                textToCopy = this.graphAsTGF
            } else if (this.tab === 1) {
                textToCopy = this.graphAsTikZ
            }

            navigator.clipboard.writeText(textToCopy).then(
                () => (this.copySuccessful = true),
                (error) => console.log('Copy unsuccessful: ', error)
            )
        },
        onClose() {
            this.dialog = false
            this.tab = null
            this.copySuccessful = false
        },
    },
}
</script>
