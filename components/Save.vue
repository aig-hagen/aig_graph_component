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
                <!--here in the future it will be possible to copy directly to clipboard  <v-btn color="primary" text @click="copyText">Copy</v-btn>-->
                <v-btn color="primary" text @click="dialog = false"
                    >Close</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
export default {
    props: {
        text: {
            type: String,
            required: true,
        },
    },
    data(): { dialog: Boolean } {
        return {
            dialog: false,
        }
    },
    methods: {
        copyText() {
            console.log('todo copy to clipboard')
        },
    },
}
</script>
