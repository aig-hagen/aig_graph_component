<script setup lang="ts">
import { computed, ref, shallowRef, watch } from 'vue'
import type {
    GraphConfigurationPublic,
    jsonGraph,
    jsonNode,
    jsonLink
} from '../../dependencies/graph-component/graph-component'

type graphElementSelect = {
    id: number | string
    label: string
}

interface Props {
    config: GraphConfigurationPublic
    graph: jsonGraph
    isPersistEnabled: boolean
    TOOLTIP_OPEN_DELAY: number
}

const props = defineProps<Props>()

const dialog = ref(false)
const levelTab = ref()

const toggleNodeLabels = ref(props.config.showNodeLabels)
const toggleNodePhysics = ref(props.config.nodePhysicsEnabled)
const toggleNodeAutoGrowToLabelSize = ref(props.config.nodeAutoGrowToLabelSize)
const toggleLinkLabels = ref(props.config.showLinkLabels)
const toggleFixedLinkDistance = ref(props.config.fixedLinkDistanceEnabled)
const toggleZoom = ref(props.config.zoomEnabled)
const isPersist = ref(props.isPersistEnabled)

//region nodeIdSelection
const nodesSelected = shallowRef<graphElementSelect[]>([])
const nodesToSelect = computed<graphElementSelect[]>(() => {
    return props.graph.nodes.map((node: jsonNode) => ({
        id: node.id,
        label: node.label ?? ''
    }))
})
const selectedAllNodes = computed(() => {
    return nodesSelected.value.length === nodesToSelect.value.length
})
const selectedSomeNodes = computed(() => {
    return nodesSelected.value.length > 0
})
//endregion

const nodeColor = ref('')

//region linkIsSelection
const linksSelected = shallowRef<graphElementSelect[]>([])
const linksToSelect = computed(() => {
    return props.graph.links.map((link: jsonLink) => ({
        id: `${link.sourceId}-${link.targetId}`,
        label: link.label ?? ''
    }))
})
const selectedAllLinks = computed(() => {
    return linksSelected.value.length === nodesToSelect.value.length
})
const selectedSomeLinks = computed(() => {
    return linksSelected.value.length > 0
})
//endregion
const linkColor = ref('')

const isSaveable = computed(
    () =>
        levelTab.value === 0 ||
        (levelTab.value === 1 && (selectedSomeNodes.value || selectedSomeLinks.value))
)

const emit = defineEmits([
    'update-default-settings',
    'update-individual-settings',
    'persist-in-local-storage'
])

watch(dialog, (open) => {
    if (open) {
        toggleNodeLabels.value = props.config.showNodeLabels
        toggleNodePhysics.value = props.config.nodePhysicsEnabled

        toggleLinkLabels.value = props.config.showLinkLabels
        toggleFixedLinkDistance.value = props.config.fixedLinkDistanceEnabled

        toggleZoom.value = props.config.zoomEnabled
        toggleNodeAutoGrowToLabelSize.value = props.config.nodeAutoGrowToLabelSize

        isPersist.value = props.isPersistEnabled
    }
})

function itemProps(item: { id: string | number; label: string }) {
    return {
        title: item.id,
        subtitle: item.label ?? ''
    }
}

function toggleAllNodes() {
    if (selectedAllNodes.value) {
        nodesSelected.value = []
    } else {
        nodesSelected.value = nodesToSelect.value.map((selectedNodes) => selectedNodes.id)
    }
}

function toggleAllLinks() {
    if (selectedAllLinks.value) {
        linksSelected.value = []
    } else {
        linksSelected.value = linksToSelect.value.map((selectedLink) => selectedLink.id)
    }
}

function handleLocalStorage() {
    if (isPersist.value) {
        localStorage.showNodeLabels = toggleNodeLabels.value
        localStorage.enableNodePhysics = toggleNodePhysics.value
        localStorage.nodeAutoGrow = toggleNodeAutoGrowToLabelSize.value

        localStorage.showLinkLabels = toggleLinkLabels.value
        localStorage.enableFixedLinkDistance = toggleFixedLinkDistance.value

        localStorage.enableZoom = toggleZoom.value

        localStorage.persistSettings = isPersist.value
    }
    localStorage.wasHere = true
}

function onSave() {
    if (levelTab.value === 0) {
        handleLocalStorage()
        emit('update-default-settings', {
            showNodeLabels: toggleNodeLabels.value,
            nodePhysicsEnabled: toggleNodePhysics.value,
            nodeAutoGrowToLabelSize: toggleNodeAutoGrowToLabelSize.value,
            showLinkLabels: toggleLinkLabels.value,
            fixedLinkDistanceEnabled: toggleFixedLinkDistance.value,
            zoomEnabled: toggleZoom.value
        })
        emit('persist-in-local-storage', isPersist.value)
    } else if (levelTab.value === 1) {
        emit(
            'update-individual-settings',
            nodesSelected.value,
            linksSelected.value,
            nodeColor.value,
            linkColor.value
        )

        console.log('linksSelected')
        console.log(linksSelected.value.map((selectedLink) => selectedLink.id))
        console.log(linksSelected.value)
    }
    onClose()
}

function onClose() {
    dialog.value = false

    nodesSelected.value = []
    linksSelected.value = []
    nodeColor.value = ''
    linkColor.value = ''
}
</script>

<template>
    <v-dialog max-width="900" scrollable v-model="dialog" persistent>
        <template #activator="{ props }">
            <v-tooltip location="bottom" :open-delay="TOOLTIP_OPEN_DELAY" text="Settings">
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
        <template v-slot:default>
            <v-card class="pa-3">
                <v-card-title>Settings</v-card-title>
                <v-card-title>
                    <v-tabs v-model="levelTab">
                        <v-tab color="secondary" density="compact" variant="elevated"
                            >Graph Level
                        </v-tab>
                        <v-tab color="secondary" density="compact" variant="elevated"
                            >Element Level
                        </v-tab>
                    </v-tabs>
                </v-card-title>
                <v-window v-model="levelTab" class="ml-4">
                    <!--                  Graph Level-->
                    <v-window-item>
                        <v-card-text>
                            <v-row>
                                <v-col cols="5">
                                    <v-row>
                                        <v-card-subtitle class="py-5"
                                            >Node Settings
                                        </v-card-subtitle>
                                    </v-row>

                                    <v-row>
                                        <v-col class="mx-0 px-0">
                                            <v-switch
                                                label="Labels"
                                                color="secondary"
                                                v-model="toggleNodeLabels"
                                            ></v-switch>
                                        </v-col>
                                    </v-row>
                                    <v-row class="my-0 py-0">
                                        <v-switch
                                            label="Physics"
                                            color="secondary"
                                            variant="text"
                                            v-model="toggleNodePhysics"
                                        ></v-switch>
                                    </v-row>
                                    <v-row class="my-0 py-0">
                                        <v-switch
                                            label="Auto Grow"
                                            color="secondary"
                                            variant="text"
                                            v-model="toggleNodeAutoGrowToLabelSize"
                                        ></v-switch>
                                    </v-row>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col cols="5">
                                    <v-row>
                                        <v-card-subtitle class="py-5"
                                            >Link Settings
                                        </v-card-subtitle>
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
                                    </v-row>
                                    <v-row class="my-0 py-0">
                                        <v-card-subtitle class="px-0"
                                            >Miscellaneous
                                        </v-card-subtitle>
                                    </v-row>
                                    <v-row class="py-0 my-0">
                                        <v-switch
                                            label="Zoom"
                                            color="secondary"
                                            v-model="toggleZoom"
                                        />
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-window-item>
                    <!--                  Element Level-->
                    <v-window-item>
                        <v-card-text>
                            <v-row>
                                <v-col cols="5">
                                    <v-row>
                                        <v-card-subtitle class="py-5"
                                            >Node Settings
                                        </v-card-subtitle>
                                    </v-row>
                                    <v-row>
                                        <v-select
                                            v-model="nodesSelected"
                                            :item-props="itemProps"
                                            :items="nodesToSelect"
                                            item-title="label"
                                            item-value="id"
                                            multiple
                                            label="Node ID Selection"
                                            variant="solo-inverted"
                                            single-line
                                        >
                                            <template
                                                v-if="nodesToSelect.length > 2"
                                                v-slot:prepend-item
                                            >
                                                <v-list-item
                                                    title="Select All"
                                                    @click="toggleAllNodes"
                                                >
                                                    <template v-slot:prepend>
                                                        <v-checkbox-btn
                                                            :color="
                                                                selectedSomeNodes
                                                                    ? 'secondary'
                                                                    : undefined
                                                            "
                                                            :indeterminate="
                                                                selectedSomeNodes &&
                                                                !selectedAllNodes
                                                            "
                                                            :model-value="selectedAllNodes"
                                                        ></v-checkbox-btn>
                                                    </template>
                                                </v-list-item>
                                                <v-divider class="mt-2"></v-divider>
                                            </template>
                                        </v-select>
                                    </v-row>
                                    <v-row>
                                        <v-card-subtitle class="py-5"
                                            >Node Appearance
                                        </v-card-subtitle>

                                        <v-expansion-panels>
                                            <v-expansion-panel>
                                                <v-expansion-panel-title>
                                                    <v-row no-gutters>
                                                        <v-col cols="8"> Node Color</v-col>
                                                        <v-col>
                                                            <v-fade-transition leave-absolute>
                                                                <span>
                                                                    {{ nodeColor }}
                                                                </span>
                                                            </v-fade-transition>
                                                        </v-col>
                                                    </v-row>
                                                </v-expansion-panel-title>
                                                <v-expansion-panel-text>
                                                    <v-color-picker
                                                        v-model="nodeColor"
                                                        canvas-height="120"
                                                        class="w-100"
                                                        color="{{nodeColor}}}"
                                                        elevation="0"
                                                    ></v-color-picker>
                                                </v-expansion-panel-text>
                                            </v-expansion-panel>
                                        </v-expansion-panels>
                                    </v-row>
                                    <v-row> </v-row>
                                    <v-row class="my-0 py-0">
                                        <!--todo-->
                                    </v-row>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col cols="5">
                                    <v-row>
                                        <v-card-subtitle class="py-5"
                                            >Link Settings
                                        </v-card-subtitle>
                                    </v-row>
                                    <v-row>
                                        <v-select
                                            v-model="linksSelected"
                                            :item-props="itemProps"
                                            :items="linksToSelect"
                                            item-title="label"
                                            item-value="id"
                                            multiple
                                            label="Link ID Selection"
                                            variant="solo-inverted"
                                            single-line
                                        >
                                            <template
                                                v-if="linksToSelect.length > 2"
                                                v-slot:prepend-item
                                            >
                                                <v-list-item
                                                    title="Select All"
                                                    @click="toggleAllLinks"
                                                >
                                                    <template v-slot:prepend>
                                                        <v-checkbox-btn
                                                            :color="
                                                                selectedSomeLinks
                                                                    ? 'secondary'
                                                                    : undefined
                                                            "
                                                            :indeterminate="
                                                                selectedSomeLinks &&
                                                                !selectedAllLinks
                                                            "
                                                            :model-value="selectedAllLinks"
                                                        ></v-checkbox-btn>
                                                    </template>
                                                </v-list-item>
                                            </template>
                                        </v-select>
                                    </v-row>
                                    <v-row>
                                        <v-card-subtitle class="py-5"
                                            >Link Appearance
                                        </v-card-subtitle>
                                        <v-expansion-panels>
                                            <v-expansion-panel>
                                                <v-expansion-panel-title>
                                                    <v-row no-gutters>
                                                        <v-col cols="8"> Link Color</v-col>
                                                        <v-col>
                                                            <v-fade-transition leave-absolute>
                                                                <span>
                                                                    {{ linkColor }}
                                                                </span>
                                                            </v-fade-transition>
                                                        </v-col>
                                                    </v-row>
                                                </v-expansion-panel-title>
                                                <v-expansion-panel-text>
                                                    <v-color-picker
                                                        v-model="linkColor"
                                                        canvas-height="120"
                                                        class="w-100"
                                                        color="{{linkColor}}}"
                                                        elevation="0"
                                                    ></v-color-picker>
                                                </v-expansion-panel-text>
                                            </v-expansion-panel>
                                        </v-expansion-panels>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-window-item>
                </v-window>
                <v-card-actions>
                    <v-checkbox
                        v-if="levelTab == 0"
                        label="Default Settings"
                        color="secondary"
                        v-model="isPersist"
                    ></v-checkbox>
                    <v-spacer />
                    <v-btn color="secondary" :disabled="!isSaveable" variant="text" @click="onSave"
                        >Save
                    </v-btn>
                    <v-btn color="secondary" variant="text" @click="onClose"> Close </v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<style scoped lang="scss"></style>
