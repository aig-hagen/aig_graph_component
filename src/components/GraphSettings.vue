<script setup lang="ts">
import { ref } from 'vue'
import type { GraphConfiguration } from '@/model/config'

//TODO attach all data to the config, the ones that currently are not attached are not shown in the view

export type Settings = {
    showNodeLabels: boolean
    nodePhysicsEnabled: boolean
    showLinkLabels: boolean
    fixedLinkDistanceEnabled: boolean
    zoomEnabled: boolean
    persistEnabled: boolean
}

interface Props {
    config: GraphConfiguration
    isWelcome: boolean
}
const props = defineProps<Props>()

const dialog = ref(props.isWelcome)

const toggleNodeLabels = ref(props.config.showNodeLabels)
const toggleNodePhysics = ref(props.config.nodePhysicsEnabled)

const toggleLinkLabels = ref(props.config.showLinkLabels)
const toggleFixedLinkDistance = ref(props.config.fixedLinkDistanceEnabled)

const toggleZoom = ref(props.config.zoomEnabled)

const radius = ref(String(props.config.nodeRadius))
const nodeColor = ref('')
const nodeLabelColor = ref('black')

const linkColor = ref('')

const isPersist = ref(props.config.persistSettingsLocalStorage)

const emit = defineEmits(['update-settings'])

function handleLocalStorage() {
    if (isPersist.value) {
        localStorage.showNodeLabels = toggleNodeLabels.value
        localStorage.enableNodePhysics = toggleNodePhysics.value

        localStorage.showLinkLabels = toggleLinkLabels.value
        localStorage.enableFixedLinkDistance = toggleFixedLinkDistance.value

        localStorage.enableZoom = toggleZoom.value

        localStorage.persistSettings = isPersist.value
    } else {
        localStorage.clear()
    }
    localStorage.wasHere = true
}

function onSave() {
    handleLocalStorage()
    emit('update-settings', {
        showNodeLabels: toggleNodeLabels.value,
        nodePhysicsEnabled: toggleNodePhysics.value,
        showLinkLabels: toggleLinkLabels.value,
        fixedLinkDistanceEnabled: toggleFixedLinkDistance.value,
        zoomEnabled: toggleZoom.value,
        persistEnabled: isPersist.value
    })

    dialog.value = false
}
</script>

<template>
    <v-dialog max-width="900" max-height="550" scrollable v-model="dialog" persistent>
        <template #activator="{ props }">
            <v-tooltip location="bottom" :open-delay="750" text="Settings">
                <template #activator="{ props: onTooltip }">
                    <v-btn
                        aria-label="Settings"
                        class="mx-1"
                        color="grey"
                        density="comfortable"
                        elevation="6"
                        icon="$settings"
                        v-bind="{ ...props, ...onTooltip }"
                        variant="plain"
                    >
                    </v-btn>
                </template>
            </v-tooltip>
        </template>
        <template v-slot:default="{ isActive }">
            <v-card class="pa-3">
                <v-card-title v-if="props.isWelcome">Welcome to the Graph Tool!</v-card-title>
                <v-card-title v-else>Settings</v-card-title>
                <v-card-subtitle
                    v-if="props.isWelcome"
                    class="px-6 pb-1"
                    aria-describedby="Welcome to the Graph Tool! You can proceed with the default settings or change them if you wish."
                >
                    You can proceed with the default settings or change them if you wish.
                </v-card-subtitle>
                <v-card-text>
                    <v-row>
                        <v-col cols="5">
                            <v-row>
                                <v-card-subtitle class="py-5">Node Settings</v-card-subtitle></v-row
                            >
                            <v-row>
                                <v-expansion-panels>
                                    <v-expansion-panel v-if="false">
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
                                                hide-inputs
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
                                        variant="solo"
                                        v-model="nodeLabelColor"
                                        required
                                        v-if="false"
                                    ></v-select
                                ></v-col>
                            </v-row>
                            <v-row class="my-0 py-0">
                                <v-switch
                                    label="Physics"
                                    color="secondary"
                                    variant="text"
                                    v-model="toggleNodePhysics"
                                ></v-switch>
                                <v-btn
                                    icon="$helpCircle"
                                    color="grey"
                                    class="mt-2"
                                    variant="text"
                                    size="small"
                                    v-if="false"
                                ></v-btn>
                            </v-row>

                            <v-row class="my-0 py-0">
                                <v-select
                                    :items="['10', '24', '50']"
                                    label="Node Radius"
                                    variant="solo"
                                    v-model="radius"
                                    required
                                    v-if="false"
                                ></v-select
                            ></v-row>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="5">
                            <v-row>
                                <v-card-subtitle class="py-5">Link Settings</v-card-subtitle></v-row
                            >
                            <v-row>
                                <v-expansion-panels>
                                    <v-expansion-panel v-if="false">
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
                                                hide-inputs
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
                                    v-if="false"
                                ></v-btn>
                            </v-row>
                            <v-row class="my-0 py-0">
                                <v-card-subtitle class="px-0">Miscellaneous</v-card-subtitle></v-row
                            >
                            <v-row class="py-0 my-0"
                                ><v-switch label="Zoom" color="secondary" v-model="toggleZoom" />
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-checkbox
                        label="Set as Default"
                        color="secondary"
                        v-model="isPersist"
                    ></v-checkbox>
                    <v-spacer />
                    <v-btn color="secondary" variant="text" @click="onSave">Save</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<style scoped lang="scss"></style>
