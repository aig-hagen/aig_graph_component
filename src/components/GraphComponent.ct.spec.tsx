import { test as base, expect, type MountResultJsx } from '@playwright/experimental-ct-vue'
import GraphComponent from '@/components/GraphComponent.vue'
import type { Page } from 'playwright/test'

// Use fixtures for cleaner tests.
// See https://playwright.dev/docs/test-fixtures
const test = base.extend<{ component: MountResultJsx; graph: GraphFixture }>({
    component: async ({ mount }, use) => {
        const component = await mount(<GraphComponent />)
        await use(component)
    },
    graph: async ({ component, page }, use) => {
        const graph = new GraphFixture(component, page)
        await use(graph)
    }
})

test('show controls if empty', async ({ component, page }) => {
    await expect(component.getByText('Controls')).toBeVisible()
    await expect(page).toHaveScreenshot()
})

test('create loop', async ({ graph, page }) => {
    const node = await graph.createNode({ x: 150, y: 150 })

    await node.createSelfLoop()

    await expect(page).toHaveScreenshot()
})

test('update label', async ({ graph, page }) => {
    const node = await graph.createNode({ x: 150, y: 150 })

    await node.enterLabel('a label')

    await expect(page).toHaveScreenshot()
})

test('expose getNodeSize', async ({ graph }) => {
    await graph.createNode({ x: 150, y: 150 })

    const nodeSize = await graph.evaluateOnComponent((instance) => instance.getNodeSize(0))

    expect(nodeSize).toEqual({ height: 48, width: 128 })
})

test('expose centerView', async ({ graph, page }) => {
    await graph.createNode({ x: 150, y: 150 })
    await graph.createNode({ x: 300, y: 300 })
    await graph.evaluateOnComponent((instance) => instance.toggleZoom(true))
    // Auto growing labels currently break size of label when zooming.
    // https://github.com/aig-hagen/aig_graph_component/issues/29
    await graph.evaluateOnComponent((instance) => instance.toggleNodeAutoGrow(false))

    await graph.evaluateOnComponent((instance) =>
        instance.centerView({ top: 5, right: 25, bottom: 50, left: 100 })
    )

    await expect(page).toHaveScreenshot()
})

test('move nodes independently', async ({ graph, page }) => {
    await graph.createNode({ x: 150, y: 150 })
    const node = await graph.createNode({ x: 300, y: 300 })

    node.drag(0, 50)

    await expect(page).toHaveScreenshot()
})

test('move node group', async ({ graph, page }) => {
    await graph.createNode({ x: 150, y: 150 })
    const node = await graph.createNode({ x: 300, y: 300 })
    await graph.evaluateOnComponent((instance) => instance.setNodeGroupsFn(() => new Set([0, 1])))

    node.drag(0, 50)

    await expect(page).toHaveScreenshot()
})

interface Position {
    x: number
    y: number
}

class GraphFixture {
    constructor(
        private component: MountResultJsx,
        private page: Page
    ) {}

    async createNode(position: Position) {
        await this.page.mouse.dblclick(position.x, position.y)
        return new NodeFixture(this.page, position)
    }

    // XXX: This is a discouraged pattern.
    // Components should communicate only via props and emits.
    // However, the graph component relies heavily on methods exposed via `defineExpose()`,
    // because it can also be used as a custom element.
    // This pattern is therefore kept in place to test those exposed methods.
    async evaluateOnComponent<ReturnT>(
        fn: (instance: InstanceType<typeof GraphComponent>) => ReturnT
    ) {
        const fnSerialized = fn.toString()
        return await this.component.evaluate((rootEl, fnSerialized) => {
            const instance = (rootEl as any)._vnode.component.subTree.component
                .exposed as InstanceType<typeof GraphComponent>
            fn = eval(fnSerialized)
            return fn(instance)
        }, fnSerialized)
    }
}

class NodeFixture {
    constructor(
        private page: Page,
        private position: Position
    ) {}

    async createSelfLoop() {
        await this.page.mouse.click(this.position.x, this.position.y, { button: 'right' })
    }

    async enterLabel(text: string) {
        await this.page.mouse.click(this.position.x, this.position.y)
        // After click, input should be focused and we can type.
        await this.page.keyboard.type(text)
        await this.page.keyboard.press('Enter')
    }

    async drag(dx: number, dy: number) {
        await this.page.mouse.move(this.position.x, this.position.y)
        await this.page.mouse.down()
        await this.page.mouse.move(this.position.x + dx, this.position.y + dy)
        await this.page.mouse.up()
        this.position.x += dx
        this.position.y += dy
    }
}
