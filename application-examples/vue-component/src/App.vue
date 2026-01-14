<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'

import {
    GraphComponent,
    type GraphConfigurationPublic,
    type LinkGUIEditability,
    type NodeGUIEditability,
    type NodeProps
} from '@aig-hagen/graph-component/lib'

import ImportExport from './components/ImportExport.vue'
import Settings from './components/Settings.vue'

const graphComponentElementRef = useTemplateRef<typeof GraphComponent>('graph-component')
const isGraphComponentInitialized = ref(false)
let graphComponentElement = ref()

const TOOLTIP_OPEN_DELAY = 750

const persistInLocalStorage = ref(true)

onMounted(() => {
    graphComponentElement.value = graphComponentElementRef.value

    if (graphComponentElement) {
        isGraphComponentInitialized.value = true
    } else {
        throw Error('Graph Component Element not available')
    }

    initFromLocalStorage()
})

function updateIndividualSettings(
    nodeIds: number[],
    nodeProps: NodeProps,
    nodeColor: string,
    nodeEditability: NodeGUIEditability,
    linkIds: string[],
    linkColor: string,
    linkEditability: LinkGUIEditability
) {
    if (nodeIds) {
        if (nodeProps) {
            graphComponentElement.value.setNodeProps(nodeProps, nodeIds)
        }
        if (nodeColor) {
            graphComponentElement.value.setColor(nodeColor, nodeIds)
        }
        if (nodeEditability) {
            graphComponentElement.value.setEditability(nodeEditability, nodeIds)
        }
    }
    if (linkIds) {
        if (linkColor) {
            graphComponentElement.value.setColor(linkColor, linkIds)
        }
        if (linkEditability) {
            graphComponentElement.value.setEditability(linkEditability, linkIds)
        }
    }
}

function initFromLocalStorage() {
    const stringToBoolean = (text: string) => (text === 'false' ? false : !!text)

    let setDefaultsObject: GraphConfigurationPublic = {}

    if (localStorage.showNodeLabels) {
        setDefaultsObject.showNodeLabels = stringToBoolean(localStorage.showNodeLabels)
    }
    if (localStorage.enableNodePhysics) {
        setDefaultsObject.nodePhysicsEnabled = stringToBoolean(localStorage.enableNodePhysics)
    }
    if (localStorage.nodeAutoGrow) {
        setDefaultsObject.nodeAutoGrowToLabelSize = stringToBoolean(localStorage.nodeAutoGrow)
    }
    if (localStorage.showLinkLabels) {
        setDefaultsObject.showLinkLabels = stringToBoolean(localStorage.showLinkLabels)
    }
    if (localStorage.enableFixedLinkDistance) {
        setDefaultsObject.fixedLinkDistanceEnabled = stringToBoolean(
            localStorage.enableFixedLinkDistance
        )
    }
    if (localStorage.enableZoom) {
        setDefaultsObject.zoomEnabled = stringToBoolean(localStorage.enableZoom)
    }
    if (localStorage.nodeProps) {
        setDefaultsObject.nodeProps = JSON.parse(localStorage.nodeProps)
    }
    if (localStorage.nodeGUIEditability) {
        setDefaultsObject.nodeGUIEditability = JSON.parse(localStorage.nodeGUIEditability)
    }
    if (localStorage.linkGUIEditability) {
        setDefaultsObject.linkGUIEditability = JSON.parse(localStorage.linkGUIEditability)
    }

    if (localStorage.persistSettings) {
        persistInLocalStorage.value = stringToBoolean(localStorage.persistSettings)
    }

    graphComponentElement.value.setDefaults(setDefaultsObject)
}

function togglePersistInLocalStorage(isEnabled: boolean) {
    persistInLocalStorage.value = isEnabled
}
</script>

<template>
    <div class="d-flex pb-3">
        <div class="graph-component-container">
            <GraphComponent ref="graph-component"></GraphComponent>
        </div>
        <div class="button-container">
            <v-tooltip location="bottom" :open-delay="TOOLTIP_OPEN_DELAY" text="Create Node">
                <template #activator="{ props }">
                    <v-btn
                        aria-label="Create Node"
                        class="mx-1"
                        color="grey"
                        density="comfortable"
                        elevation="6"
                        icon="$addNode"
                        variant="plain"
                        v-bind="props"
                        @click="graphComponentElement.createNode()"
                    >
                    </v-btn>
                </template>
            </v-tooltip>
            <v-tooltip location="bottom" :open-delay="TOOLTIP_OPEN_DELAY" text="Delete Graph">
                <template #activator="{ props }">
                    <v-btn
                        aria-label="Delete Graph"
                        class="mx-1"
                        color="grey"
                        density="comfortable"
                        elevation="6"
                        icon="$deleteGraph"
                        variant="plain"
                        v-bind="props"
                        @click="graphComponentElement.setGraph()"
                    >
                    </v-btn>
                </template>
            </v-tooltip>
            <import-export
                v-if="isGraphComponentInitialized"
                :graph-as-json="graphComponentElement.getGraph('json', true, true, true, true)"
                :graph-as-tgf="graphComponentElement.getGraph('tgf', false, false, false, false)"
                @file-imported="graphComponentElement.setGraph"
            ></import-export>
            <v-tooltip location="bottom" :open-delay="TOOLTIP_OPEN_DELAY" text="Reset View">
                <template #activator="{ props }">
                    <v-btn
                        aria-label="Reset View"
                        class="mx-1"
                        color="grey"
                        density="comfortable"
                        icon="$resetView"
                        elevation="6"
                        variant="plain"
                        v-bind="props"
                        v-if="
                            isGraphComponentInitialized &&
                            graphComponentElement.getDefaults().zoomEnabled
                        "
                        @click="graphComponentElement.resetView()"
                    ></v-btn>
                </template>
            </v-tooltip>
            <settings
                v-if="isGraphComponentInitialized"
                :config="graphComponentElement.getDefaults()"
                :graph="graphComponentElement.getGraph('json', true, true, true, true)"
                :is-persist-enabled="persistInLocalStorage"
                :TOOLTIP_OPEN_DELAY="TOOLTIP_OPEN_DELAY"
                @update-default-settings="graphComponentElement.setDefaults"
                @update-individual-settings="updateIndividualSettings"
                @persist-in-local-storage="togglePersistInLocalStorage"
            ></settings>
        </div>
    </div>
</template>

<style lang="scss">
.graph-component-container {
    position: absolute;
    width: 100%;
    height: 100%;
    touch-action: none;
    background-color: lightgrey;
}
</style>
