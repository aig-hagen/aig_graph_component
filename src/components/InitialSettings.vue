<script setup lang="ts">
import { ref } from 'vue'

const radius = ref('24')
const nodeColor = ref('')
const nodeLabelColor = ref('black')
const toggleNodeLabels = ref(true)
const toggleNodePhysics = ref(false)

const linkColor = ref('')
const toggleLinkLabels = ref(true)
const toggleFixedLinkDistance = ref(false)

const toggleZoom = ref(false)

function onSubmit() {
    console.log(`Radius: ${radius.value}`)
}
</script>

<template>
    <v-dialog max-width="850" max-height="500" scrollable>
        <template v-slot:default="{ isActive }">
            <v-card title="Welcome to the Graph Tool!" class="pa-3">
                <v-card-text class="py-5"
                    >You can proceed with the default settings or change them if you wish.
                    <v-form class="px-3 py-5">
                        <v-row>
                            <v-col cols="5">
                                <v-row>
                                    <v-card-subtitle class="py-5"
                                        >Node Settings</v-card-subtitle
                                    ></v-row
                                >
                                <v-row>
                                    <v-expansion-panels>
                                        <v-expansion-panel>
                                            <v-expansion-panel-title>
                                                <v-row no-gutters>
                                                    <v-col cols="4"> Node Color </v-col>
                                                    <v-col>
                                                        <v-fade-transition leave-absolute>
                                                            <span>
                                                                {{ nodeColor }}
                                                            </span>
                                                        </v-fade-transition>
                                                    </v-col>
                                                </v-row></v-expansion-panel-title
                                            >
                                            <v-expansion-panel-text>
                                                <v-color-picker
                                                    v-model="nodeColor"
                                                    canvas-height="120"
                                                    class="w-100"
                                                    color="{{nodeColor}}}"
                                                    elevation="0"
                                                    :modes="['rgba', 'hsla', 'hexa']"
                                                ></v-color-picker
                                            ></v-expansion-panel-text>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </v-row>

                                <v-row>
                                    <v-col class="mx-0 px-0">
                                        <v-switch
                                            label="Labels"
                                            color="secondary"
                                            v-model="toggleNodeLabels"
                                        ></v-switch>
                                    </v-col>
                                    <v-col class="mx-0 px-0">
                                        <v-select
                                            v-show="toggleNodeLabels"
                                            :items="['white', 'black']"
                                            label="Label Color"
                                            variant="solo-filled"
                                            v-model="nodeLabelColor"
                                            required
                                        ></v-select
                                    ></v-col>
                                </v-row>
                                <v-row class="my-0 py-0">
                                    <v-switch
                                        label="Physics"
                                        color="secondary"
                                        variant="text"
                                        size="small"
                                        v-model="toggleNodePhysics"
                                    ></v-switch>
                                    <v-btn
                                        icon="$helpCircle"
                                        color="grey"
                                        class="mt-2"
                                        variant="text"
                                        size="small"
                                    ></v-btn>
                                </v-row>

                                <v-row class="my-0 py-0">
                                    <v-select
                                        :items="['10', '24', '50']"
                                        label="Node Radius"
                                        variant="solo-filled"
                                        v-model="radius"
                                        required
                                    ></v-select
                                ></v-row>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="5">
                                <v-row>
                                    <v-card-subtitle class="py-5"
                                        >Link Settings</v-card-subtitle
                                    ></v-row
                                >
                                <v-row>
                                    <v-expansion-panels>
                                        <v-expansion-panel>
                                            <v-expansion-panel-title>
                                                <v-row no-gutters>
                                                    <v-col cols="4"> Link Color </v-col>
                                                    <v-col>
                                                        <v-fade-transition leave-absolute>
                                                            <span>
                                                                {{ linkColor }}
                                                            </span>
                                                        </v-fade-transition>
                                                    </v-col>
                                                </v-row></v-expansion-panel-title
                                            >
                                            <v-expansion-panel-text>
                                                <v-color-picker
                                                    v-model="linkColor"
                                                    canvas-height="120"
                                                    class="w-100"
                                                    color="{{linkColor}}}"
                                                    :modes="['rgba', 'hsla', 'hexa']"
                                                    elevation="0"
                                                ></v-color-picker
                                            ></v-expansion-panel-text>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </v-row>
                                <v-row>
                                    <v-switch
                                        label="Labels"
                                        class="pt-3 mx-0 px-0"
                                        color="secondary"
                                        v-model="toggleLinkLabels"
                                    ></v-switch>
                                </v-row>
                                <v-row>
                                    <v-switch
                                        label="Fixed Distance"
                                        color="secondary"
                                        v-model="toggleFixedLinkDistance"
                                    ></v-switch>
                                    <v-btn
                                        icon="$helpCircle"
                                        color="grey"
                                        class="mt-2"
                                        variant="text"
                                        size="small"
                                    ></v-btn>
                                </v-row>
                            </v-col>
                        </v-row>

                        <v-row class="my-0 py-0">
                            <v-card-subtitle class="px-0 pt-5"
                                >Miscellaneous</v-card-subtitle
                            ></v-row
                        >
                        <v-row
                            ><v-switch label="Zoom" color="secondary" v-model="toggleZoom" />
                        </v-row>
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer />
                    <v-btn color="secondary" variant="text" @click="onSubmit">Save</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<style scoped lang="scss"></style>
