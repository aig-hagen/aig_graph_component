<script setup lang="ts">
interface Control {
    action: string
    desktop: string
    touch: string
}
interface Props {
    showHeader: boolean
    showControlsGraph: boolean
    showLatexInfo: boolean
    showControlsEnvironment: boolean
    platformType: string
}

const props = defineProps<Props>()

const controlsGraph: Control[] = [
    {
        action: 'Create node',
        desktop: 'Double-click',
        touch: 'Double-tap'
    },
    {
        action: 'Create link',
        desktop: 'Right-click on node + hold + drag towards target',
        touch: 'Hold + drag'
    },
    {
        action: 'Delete node/link',
        desktop: 'Right-click + hold',
        touch: 'Touch + hold'
    },
    {
        action: 'Move node',
        desktop: 'Left-click + hold on node + drag',
        touch: '-'
    },
    {
        action: 'Create/Update label',
        desktop: props.showLatexInfo
            ? 'Left-click on label, $$ for $\\LaTeX$'
            : 'Left-click on label',
        touch: props.showLatexInfo ? 'Tap on label, $$ for $\\LaTeX$' : 'Tap on label'
    }
]

const controlsEnvironment: Control[] = [
    {
        action: 'Pan',
        desktop: 'Left-click on canvas + hold + drag',
        touch: 'Multi-touch'
    },
    {
        action: 'Zoom',
        desktop: 'Mouse wheel',
        touch: 'Multi-touch'
    }
]

const headers: any = ['Action', 'Controls']

let isTouch = props.platformType === 'mobile' || props.platformType === 'tablet'
</script>

<template>
    <table class="graph-controller__controls-overview">
        <thead v-show="props.showHeader">
            <tr>
                <th>{{ headers[0] }}</th>
                <th>{{ headers[1] }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-show="props.showControlsGraph" v-for="item in controlsGraph" :key="item.action">
                <td>{{ item.action }}</td>
                <td v-if="isTouch">{{ item.touch }}</td>
                <td v-else>{{ item.desktop }}</td>
            </tr>
            <tr
                v-show="props.showControlsEnvironment"
                v-for="item in controlsEnvironment"
                :key="item.action"
            >
                <td>{{ item.action }}</td>
                <td v-if="isTouch">{{ item.touch }}</td>
                <td v-else>{{ item.desktop }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped lang="scss">
.graph-controller__controls-overview {
    display: flex;
    flex-direction: column;

    tr {
        display: flex;
    }

    th,
    td {
        flex: 1;
        padding: 12px 4px;
        text-align: justify;
    }
}
</style>
