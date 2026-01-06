<script setup lang="ts">
import { computed, reactive, ref, shallowRef, watch } from 'vue'
import {
    type GraphConfigurationPublic,
    type jsonGraph,
    type jsonLink,
    type jsonNode,
    type LinkGUIEditability,
    type NodeCircle,
    type NodeGUIEditability,
    type NodeProps,
    type NodeRect
} from '../../dependencies/graph-component/graph-component'

type graphElementNodeSelect = {
    id: number
    label: string
    props: NodeProps
    guiEditability: NodeGUIEditability
    color: string
}

type graphElementLinkSelect = {
    id: string
    label: string
    guiEditability: LinkGUIEditability
    color: string
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

//region graph level
const toggleNodeLabels = ref(props.config.showNodeLabels)
const toggleNodePhysics = ref(props.config.nodePhysicsEnabled)
const toggleNodeAutoGrowToLabelSize = ref(props.config.nodeAutoGrowToLabelSize)
const toggleLinkLabels = ref(props.config.showLinkLabels)
const toggleFixedLinkDistance = ref(props.config.fixedLinkDistanceEnabled)
const toggleZoom = ref(props.config.zoomEnabled)
const isPersist = ref(props.isPersistEnabled)

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
//endregion

//region element level node
// nodeIdSelection
const nodesSelected = shallowRef<number[]>([])
const nodesToSelect = computed<graphElementNodeSelect[]>(() => {
    return props.graph.nodes.map(
        (node: jsonNode) =>
            ({
                id: node.id,
                label: node.label ?? '',
                props: node.props ?? undefined,
                guiEditability: {
                    deletable: node.deletable,
                    labelEditable: node.labelEditable,
                    fixedPosition: {
                        x: node.fixedPosition?.x,
                        y: node.fixedPosition?.y
                    },
                    allowIncomingLinks: node.allowIncomingLinks,
                    allowOutgoingLinks: node.allowOutgoingLinks
                },
                color: node.color ?? ''
            }) as graphElementNodeSelect
    )
})
const selectedAllNodes = computed(() => {
    return nodesSelected.value.length === nodesToSelect.value.length
})
const selectedSomeNodes = computed(() => {
    return nodesSelected.value.length > 0
})

//node appearance
const nodeAppearance = reactive({
    shape: null,
    radius: null,
    width: null,
    height: null,
    cornerRadius: null,
    reflexiveEdgeStart: null,
    color: null
})

const nodeShapesToSelect = ['circle', 'rect']
const reflexiveEdgeStartToSelect = [
    'MOVABLE',
    'RIGHT',
    'BOTTOMRIGHT',
    'BOTTOM',
    'BOTTOMLEFT',
    'LEFT',
    'TOPLEFT',
    'TOP',
    'TOPRIGHT'
]

const nodePropsToEmit = computed(() => {
    if (nodeAppearance.shape) {
        if (nodeAppearance.shape === 'circle') {
            return { shape: nodeAppearance.shape, radius: nodeAppearance.radius }
        } else if (nodeAppearance.shape === 'rect') {
            return {
                shape: nodeAppearance.shape,
                width: nodeAppearance.width,
                height: nodeAppearance.height,
                cornerRadius: nodeAppearance.cornerRadius,
                reflexiveEdgeStart: nodeAppearance.reflexiveEdgeStart
            }
        }
    }
})

// node editablility

const nodeEditability = reactive({
    deletable: null,
    labelEditable: null,
    fixedXAxis: null,
    fixedYAxis: null,
    allowIncomingLinks: null,
    allowOutgoingLinks: null
})

const toggleFixedPos = computed({
    get() {
        return nodeEditability.fixedXAxis || nodeEditability.fixedYAxis
    },
    set(value) {
        nodeEditability.fixedXAxis = value
        nodeEditability.fixedYAxis = value
    }
})
const toggleAllowLinks = computed({
    get() {
        return nodeEditability.allowIncomingLinks || nodeEditability.allowOutgoingLinks
    },
    set(value) {
        nodeEditability.allowIncomingLinks = value
        nodeEditability.allowOutgoingLinks = value
    }
})

const nodeEditabilityToEmit = computed(() => {
    if (selectedSomeNodes.value) {
        return {
            deletable: nodeEditability.deletable,
            labelEditable: nodeEditability.labelEditable,
            fixedPosition: {
                x: nodeEditability.fixedXAxis,
                y: nodeEditability.fixedYAxis
            },
            allowIncomingLinks: nodeEditability.allowIncomingLinks,
            allowOutgoingLinks: nodeEditability.allowOutgoingLinks
        }
    } else {
        return undefined
    }
})

watch(
    () => nodesSelected.value,
    (nodes) => {
        if (nodes.length === 1) {
            initFromNode(nodes[0]!)
        } else if (selectedSomeNodes.value) {
            initFromGraphLevelConfigForNodes()
        } else {
            clearElementForm()
        }
    }
)

//endregion

//region element level link
//region linkIsSelection
const linksSelected = shallowRef<string[]>([])
const linksToSelect = computed<graphElementLinkSelect[]>(() => {
    return props.graph.links.map(
        (link: jsonLink) =>
            ({
                id: `${link.sourceId}-${link.targetId}`,
                label: link.label ?? '',
                guiEditability: {
                    labelEditable: link.labelEditable,
                    deletable: link.deletable
                },
                color: link.color
            }) as graphElementLinkSelect
    )
})
const selectedAllLinks = computed(() => {
    return linksSelected.value.length === nodesToSelect.value.length
})
const selectedSomeLinks = computed(() => {
    return linksSelected.value.length > 0
})
//endregion

// link appearance
const linkColor = ref('')

// link editablility
const linkEditability = reactive({
    deletable: null,
    labelEditable: null
})

const linkEditabilityToEmit = computed(() => {
    if (selectedSomeLinks.value) {
        return {
            deletable: linkEditability.deletable,
            labelEditable: linkEditability.labelEditable
        }
    } else {
        return undefined
    }
})

watch(
    () => linksSelected.value,
    (links) => {
        if (links.length === 1) {
            initFromLink(links[0]!)
        } else if (selectedSomeLinks.value) {
            initFromGraphLevelConfigForLinks()
        } else {
            clearElementForm()
        }
    }
)
//endregion

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

function initFromNode(nodeId: number) {
    const node = nodesToSelect.value.find((node: graphElementNodeSelect) => node.id === nodeId)

    if (node) {
        if (node.props.shape === 'circle') {
            Object.assign(nodeAppearance, {
                shape: node.props.shape,
                radius: node.props.radius,
                width: null,
                height: null,
                cornerRadius: null,
                reflexiveEdgeStartToSelect: null,
                color: node.color
            })
        } else if (node.props.shape === 'rect') {
            Object.assign(nodeAppearance, {
                shape: node.props.shape,
                radius: null,
                width: node.props.width,
                height: node.props.height,
                cornerRadius: node.props.cornerRadius,
                reflexiveEdgeStart: node.props.reflexiveEdgeStart,
                color: node.color
            })
        }

        Object.assign(nodeEditability, {
            deletable: node.guiEditability.deletable,
            labelEditable: node.guiEditability.labelEditable,
            fixedXAxis: node.guiEditability.fixedPosition?.x,
            fixedYAxis: node.guiEditability.fixedPosition?.y,
            allowIncomingLinks: node.guiEditability.allowIncomingLinks,
            allowOutgoingLinks: node.guiEditability.allowOutgoingLinks
        })
    }
}

function initFromGraphLevelConfigForNodes() {
    Object.assign(nodeAppearance, {
        shape: props.config.nodeProps?.shape,
        radius: (props.config.nodeProps as NodeCircle).radius,
        width: (props.config.nodeProps as NodeRect).width,
        height: (props.config.nodeProps as NodeRect).height,
        cornerRadius: (props.config.nodeProps as NodeRect).cornerRadius,
        reflexiveEdgeStart: (props.config.nodeProps as NodeRect).reflexiveEdgeStart,
        color: null
    })

    Object.assign(nodeEditability, {
        deletable: props.config.nodeGUIEditability?.deletable,
        labelEditable: props.config.nodeGUIEditability?.labelEditable,
        fixedXAxis: props.config.nodeGUIEditability?.fixedPosition?.x,
        fixedYAxis: props.config.nodeGUIEditability?.fixedPosition?.y,
        allowIncomingLinks: props.config.nodeGUIEditability?.allowIncomingLinks,
        allowOutgoingLinks: props.config.nodeGUIEditability?.allowOutgoingLinks
    })
}

function initFromLink(linkId: string) {
    const link = linksToSelect.value.find((link: graphElementLinkSelect) => link.id === linkId)

    if (link) {
        Object.assign(linkEditability, {
            deletable: link.guiEditability.deletable,
            labelEditable: link.guiEditability.labelEditable
        })
        linkColor.value = link.color
    }
}

function initFromGraphLevelConfigForLinks() {
    Object.assign(linkEditability, {
        deletable: props.config.linkGUIEditability?.deletable,
        labelEditable: props.config.linkGUIEditability?.labelEditable
    })
    linkColor.value = ''
}

function clearElementForm() {
    //node appearance
    Object.assign(nodeAppearance, {
        shape: null,
        radius: null,
        width: null,
        height: null,
        cornerRadius: null,
        reflexiveEdgeStart: null,
        color: null
    })

    //node editability
    Object.assign(nodeEditability, {
        deletable: null,
        labelEditable: null,
        fixedXAxis: null,
        fixedYAxis: null,
        allowIncomingLinks: null,
        allowOutgoingLinks: null
    })

    //link appearance
    linkColor.value = ''

    //link editability
    Object.assign(linkEditability, {
        deletable: null,
        labelEditable: null
    })
}

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
            nodePropsToEmit.value,
            nodeAppearance.color,
            nodeEditabilityToEmit.value,
            linksSelected.value,
            linkColor.value,
            linkEditabilityToEmit.value
        )
    }
    onClose()
}

function onClose() {
    dialog.value = false

    nodesSelected.value = []
    linksSelected.value = []
}
</script>

<template>
    <v-dialog max-width="900px" scrollable v-model="dialog" persistent>
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
                <v-card-text>
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
                                        <!--                                  Node Id Selection-->
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
                                        <!--                                  Node Appearance-->
                                        <v-row>
                                            <v-card-subtitle class="py-5"
                                                >Node Appearance
                                            </v-card-subtitle>
                                        </v-row>
                                        <v-row>
                                            <v-select
                                                v-model="nodeAppearance.shape"
                                                :items="nodeShapesToSelect"
                                                label="Shape"
                                                variant="solo"
                                                clearable
                                            ></v-select>
                                            <!--                                      radius-->
                                            <v-number-input
                                                v-model="nodeAppearance.radius"
                                                v-if="nodeAppearance.shape === 'circle'"
                                                :min="1"
                                                :max="250"
                                                control-variant="hidden"
                                                label="Radius"
                                            ></v-number-input>
                                        </v-row>
                                        <v-row v-if="nodeAppearance.shape === 'rect'" class="mt-0">
                                            <!--                                      width -->
                                            <v-number-input
                                                v-model="nodeAppearance.width"
                                                v-if="nodeAppearance.shape === 'rect'"
                                                :min="1"
                                                :max="500"
                                                control-variant="hidden"
                                                label="Width"
                                            ></v-number-input>
                                            <!--                                      height-->
                                            <v-number-input
                                                v-model="nodeAppearance.height"
                                                v-if="nodeAppearance.shape === 'rect'"
                                                :min="1"
                                                :max="500"
                                                control-variant="hidden"
                                                label="Height"
                                            ></v-number-input>
                                        </v-row>
                                        <v-row v-if="nodeAppearance.shape === 'rect'" class="mt-0">
                                            <v-number-input
                                                v-model="nodeAppearance.cornerRadius"
                                                v-if="nodeAppearance.shape === 'rect'"
                                                :min="0"
                                                :max="8"
                                                control-variant="stacked"
                                                label="Corner Radius"
                                            >
                                            </v-number-input>
                                            <v-select
                                                v-model="nodeAppearance.reflexiveEdgeStart"
                                                :items="reflexiveEdgeStartToSelect"
                                                label="Reflexive Edge Start"
                                                single-line
                                            >
                                            </v-select>
                                        </v-row>
                                        <!--                                      Node Color-->
                                        <v-row>
                                            <v-expansion-panels class="mb-5">
                                                <v-expansion-panel>
                                                    <v-expansion-panel-title
                                                        expand-icon="$menuDown"
                                                        style="color: grey"
                                                    >
                                                        <v-row no-gutters>
                                                            <v-col cols="8" style="color: grey">
                                                                Node Color
                                                            </v-col>
                                                            <v-col>
                                                                <v-fade-transition leave-absolute>
                                                                    <span>
                                                                        {{ nodeAppearance.color }}
                                                                    </span>
                                                                </v-fade-transition>
                                                            </v-col>
                                                        </v-row>
                                                    </v-expansion-panel-title>
                                                    <v-expansion-panel-text>
                                                        <v-color-picker
                                                            v-model="nodeAppearance.color"
                                                            canvas-height="120"
                                                            class="w-100"
                                                            color="{{nodeAppearance.color}}}"
                                                            elevation="0"
                                                        ></v-color-picker>
                                                    </v-expansion-panel-text>
                                                </v-expansion-panel>
                                            </v-expansion-panels>
                                        </v-row>
                                        <!--                                  Node Editability-->
                                        <v-row>
                                            <v-card-subtitle class="py-5"
                                                >Node Editability
                                            </v-card-subtitle>
                                        </v-row>
                                        <v-row class="my-0 py-0">
                                            <v-switch
                                                label="Deletable"
                                                color="secondary"
                                                v-model="nodeEditability.deletable"
                                            >
                                            </v-switch>
                                        </v-row>
                                        <v-row class="my-0 py-0">
                                            <v-switch
                                                label="Label Editable"
                                                color="secondary"
                                                variant="text"
                                                v-model="nodeEditability.labelEditable"
                                            >
                                            </v-switch>
                                        </v-row>
                                        <v-row class="my-0 py-0">
                                            <v-switch
                                                label="Fixed Position"
                                                color="secondary"
                                                variant="text"
                                                v-model="toggleFixedPos"
                                            >
                                            </v-switch>
                                        </v-row>
                                        <v-row>
                                            <v-checkbox-btn
                                                v-if="toggleFixedPos"
                                                v-model="nodeEditability.fixedXAxis"
                                                label="Fixed x-Position"
                                                color="secondary"
                                            ></v-checkbox-btn>
                                            <v-checkbox-btn
                                                v-if="toggleFixedPos"
                                                v-model="nodeEditability.fixedYAxis"
                                                label="Fixed y-Position"
                                                color="secondary"
                                            ></v-checkbox-btn>
                                        </v-row>
                                        <v-row class="my-0 py-0">
                                            <v-switch
                                                label="Allow Links"
                                                color="secondary"
                                                variant="text"
                                                v-model="toggleAllowLinks"
                                            >
                                            </v-switch>
                                        </v-row>
                                        <v-row class="mt-0">
                                            <v-checkbox-btn
                                                v-if="toggleAllowLinks"
                                                v-model="nodeEditability.allowIncomingLinks"
                                                label="Incoming"
                                                color="secondary"
                                            ></v-checkbox-btn>
                                            <v-checkbox-btn
                                                v-if="toggleAllowLinks"
                                                v-model="nodeEditability.allowOutgoingLinks"
                                                label="Outgoing"
                                                color="secondary"
                                            ></v-checkbox-btn>
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
                                        </v-row>
                                        <v-row>
                                            <!--                                        just used for alignment-->
                                            <v-select disabled class="opacity-0"></v-select>
                                        </v-row>
                                        <v-row>
                                            <v-expansion-panels>
                                                <v-expansion-panel>
                                                    <v-expansion-panel-title
                                                        expand-icon="$menuDown"
                                                        style="color: grey"
                                                    >
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
                                        <v-row>
                                            <v-card-subtitle class="py-5"
                                                >Link Appearance
                                            </v-card-subtitle>
                                        </v-row>
                                        <v-row class="my-0 py-0">
                                            <v-switch
                                                label="Deletable"
                                                color="secondary"
                                                v-model="linkEditability.deletable"
                                            >
                                            </v-switch>
                                        </v-row>
                                        <v-row class="my-0 py-0">
                                            <v-switch
                                                label="Label Editable"
                                                color="secondary"
                                                variant="text"
                                                v-model="linkEditability.labelEditable"
                                            >
                                            </v-switch>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-window-item>
                    </v-window>
                </v-card-text>
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
                    <v-btn color="secondary" variant="text" @click="onClose"> Close</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<style scoped lang="scss"></style>
