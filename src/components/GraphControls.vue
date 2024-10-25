<script setup lang="ts">
interface Control {
    action: string
    desktop: string
    mobile: string
}
interface Props {
    showHeader: boolean
    showControlsGraph: boolean
    showLatexInfo: boolean
    showControlsEnvironment: boolean
}

const props = defineProps<Props>()

const controlsGraph: Control[] = [
    {
        action: 'Create node',
        desktop: 'Double-click',
        mobile: 'Double-tap'
    },
    {
        action: 'Create link',
        desktop: 'Right-click on node + hold + drag towards target',
        mobile: 'Long-tap + drag'
    },
    {
        action: 'Delete node/link',
        desktop: 'Right-click + hold on node/link',
        mobile: 'Long-tap'
    },
    {
        action: 'Move node',
        desktop: 'Left-click + hold on node + drag',
        mobile: '-'
    },
    {
        action: 'Create/Update label',
        desktop: props.showLatexInfo
            ? 'Left-click on label, $$ for $\\LaTeX$'
            : 'Left-click on label',
        mobile: props.showLatexInfo ? 'Tap on label, $$ for $\\LaTeX$' : 'Tap on label'
    }
]

const controlsEnvironment: Control[] = [
    {
        action: 'Pan',
        desktop: 'Left-click on canvas + drag',
        mobile: 'Multi-touch'
    },
    {
        action: 'Zoom',
        desktop: 'Mouse wheel',
        mobile: 'Multi-touch'
    }
]

const headers: any = ['Action', 'Desktop', 'Touch']
</script>

<template>
    <table>
        <thead v-show="props.showHeader">
            <tr>
                <th>{{ headers[0] }}</th>
                <th>{{ headers[1] }}</th>
                <th>{{ headers[2] }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-show="props.showControlsGraph" v-for="item in controlsGraph" :key="item.action">
                <td>{{ item.action }}</td>
                <td>{{ item.desktop }}</td>
                <td>{{ item.mobile }}</td>
            </tr>
            <tr
                v-show="props.showControlsEnvironment"
                v-for="item in controlsEnvironment"
                :key="item.action"
            >
                <td>{{ item.action }}</td>
                <td>{{ item.desktop }}</td>
                <td>{{ item.mobile }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped lang="scss"></style>
