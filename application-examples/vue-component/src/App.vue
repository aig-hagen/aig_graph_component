<script setup lang="ts"></script>
<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'

import {
    GraphComponent,
    type GraphConfigurationPublic
} from '../dependencies/graph-component/graph-component.js'
import ImportExport from './components/ImportExport.vue'
import Settings from './components/Settings.vue'

const graphComponentElementRef = useTemplateRef<typeof GraphComponent>('graph-component')
const isGraphComponentInitialized = ref(false)
let graphComponentElement = ref()
// let graphInstance = ref()

const TOOLTIP_OPEN_DELAY = 750

const persistInLocalStorage = ref(true)

onMounted(() => {
    graphComponentElement.value = graphComponentElementRef.value
    // graphInstance.value = graphComponentElement.value._instance.exposed braucht man nicht, kann direkt auf graphCompnoentelement könnte man eig auch direkt auf dem ref?

    if (graphComponentElement) {
        isGraphComponentInitialized.value = true
    } else {
        throw Error('Graph Component Element not available')
    }

    // )

    initFromLocalStorage()
})
function updateIndividualSettings(
    nodeIds: number[],
    linkIds: string[],
    nodeColor: string,
    linkColor: string
) {
    console.log('event')
    console.log(nodeIds)
    console.log(linkIds)
    console.log(nodeColor)

    if (nodeColor) {
        console.log('inside node color')
        graphComponentElement.value.setColor(nodeColor, nodeIds)
    }
    if (linkColor) {
        console.log('inside link color')
        graphComponentElement.value.setColor(linkColor, linkIds)
    }
}

function initFromLocalStorage() {
    const stringToBoolean = (text: string) => (text === 'false' ? false : !!text)

    let setDefaultsObject: GraphConfigurationPublic = {}

    //config
    if (localStorage.showNodeLabels) {
        setDefaultsObject.showNodeLabels = stringToBoolean(localStorage.showNodeLabels)
    }
    if (localStorage.enableNodePhysics) {
        setDefaultsObject.nodePhysicsEnabled = stringToBoolean(localStorage.enableNodePhysics)
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

    if (localStorage.persistSettings) {
        persistInLocalStorage.value = stringToBoolean(localStorage.persistSettings)
    }

    graphComponentElement.value.setDefaults(setDefaultsObject)
}

function togglePersistInLocalStorage(isEnabled: boolean) {
    console.log('persist in local storage')
    console.log(isEnabled)
    persistInLocalStorage.value = isEnabled
}
</script>

<template>
    <div class="d-flex pb-3">
        <div class="graph-component-container">
            <!--            <GraphComponent ref="graph-component"></GraphComponent>-->
            <graph-component ref="graph-component"></graph-component>
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

<style scoped></style>
            <!--            <help></help>-->
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
