import { test as base, expect, type MountResultJsx } from '@playwright/experimental-ct-vue'
import GraphComponent from '@/components/GraphComponent.vue'
import type { Page } from 'playwright/test'

// Use fixtures for cleaner tests.
// See https://playwright.dev/docs/test-fixtures
const test = base.extend<{ component: MountResultJsx; graph: GraphFixture }>({
    component: async ({ mount }, use) => {
        const component = await mount(<GraphComponent id="test-graph" />)
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

    expect(nodeSize).toStrictEqual({ height: 48, width: 128 })
})

test('expose centerView', async ({ graph, page }) => {
    await graph.evaluateOnComponent((instance) => instance.toggleZoom(true))
    // Auto growing labels currently break size of label when zooming.
    // See https://github.com/aig-hagen/aig_graph_component/issues/29
    await graph.evaluateOnComponent((instance) => instance.toggleNodeAutoGrow(false))
    await graph.createNode({ x: 150, y: 150 })
    await graph.createNode({ x: 300, y: 300 })

    await graph.evaluateOnComponent((instance) =>
        instance.centerView({ top: 5, right: 25, bottom: 50, left: 100 })
    )

    await expect(page).toHaveScreenshot()
})

test('move nodes independently', async ({ graph, page }) => {
    await graph.createNode({ x: 150, y: 150 })
    const node = await graph.createNode({ x: 300, y: 300 })

    await node.drag(0, 50)

    await expect(page).toHaveScreenshot()
})

test('move node group', async ({ graph, page }) => {
    await graph.createNode({ x: 150, y: 150 })
    const node = await graph.createNode({ x: 300, y: 300 })
    await graph.evaluateOnComponent((instance) => instance.setNodeGroupsFn(() => new Set([0, 1])))

    await node.drag(0, 50)

    await expect(page).toHaveScreenshot()
})

test('move nodes with collision', async ({ graph, page }) => {
    await graph.createNode({ x: 150, y: 150 })
    const node = await graph.createNode({ x: 300, y: 300 })

    await node.drag(-140, -140)

    await expect(page).toHaveScreenshot()
})

test('move nodes without collision', async ({ graph, page }) => {
    // Auto growing labels currently breaks overlapping.
    // See https://github.com/aig-hagen/aig_graph_component/issues/29
    await graph.evaluateOnComponent((instance) => instance.toggleNodeAutoGrow(false))
    await graph.evaluateOnComponent((instance) => instance.toggleCollisionDetection(false))
    await graph.createNode({ x: 150, y: 150 })
    const node = await graph.createNode({ x: 300, y: 300 })

    await node.drag(-140, -140)

    await expect(page).toHaveScreenshot()
})

test('expose getNodePosition for non-fixed node', async ({ graph }) => {
    await graph.createNode({ x: 150, y: 150 })

    const position = await graph.evaluateOnComponent((instance) => instance.getNodePosition(0))

    expect(position).toStrictEqual({ x: 150, y: 150 })
})

test('expose getNodePosition for fixed node', async ({ graph }) => {
    await graph.evaluateOnComponent((instance) =>
        instance.setEditability(
            {
                fixedPosition: {
                    x: true,
                    y: true
                }
            },
            undefined
        )
    )
    await graph.createNode({ x: 150, y: 150 })

    const position = await graph.evaluateOnComponent((instance) => instance.getNodePosition(0))

    expect(position).toStrictEqual({ x: 150, y: 150 })
})

test('expose setNodePosition', async ({ graph, page }) => {
    await graph.createNode({ x: 150, y: 150 })

    await graph.evaluateOnComponent((instance) =>
        instance.setNodePosition(
            {
                x: 25,
                y: 50
            },
            undefined,
            0
        )
    )

    const position = await graph.evaluateOnComponent((instance) => instance.getNodePosition(0))
    expect(position).toStrictEqual({ x: 64, y: 50 })
    await expect(page).toHaveScreenshot()
})

test('setting node position can fix', async ({ graph, page }) => {
    const node = await graph.createNode({ x: 150, y: 150 })

    await graph.evaluateOnComponent((instance) =>
        instance.setNodePosition(
            {
                x: 100,
                y: 100
            },
            {
                x: true,
                y: false
            },
            0
        )
    )

    await node.drag(100, 100)
    const position = await graph.evaluateOnComponent((instance) => instance.getNodePosition(0))
    expect(position).toStrictEqual({ x: 100, y: 200 })
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

    private async getAllNodeIds(): Promise<string[]> {
        return await this.component
            .locator('rect[id^="test-graph-"]')
            .evaluateAll((elements) => elements.map((el) => el.id))
    }

    async createNode(position: Position) {
        const idsBefore = await this.getAllNodeIds()
        await this.page.mouse.dblclick(position.x, position.y)
        const idsAfter = await this.getAllNodeIds()
        const newIds = idsAfter.filter((id) => !idsBefore.includes(id))
        if (newIds.length !== 1) {
            throw new Error(`Expected 1 new node, but found ${newIds.length}`)
        }
        const newId = newIds[0]!
        return new NodeFixture(this.component, this.page, newId)
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
            const instance = (rootEl as any).__vnode.ctx.exposed as InstanceType<
                typeof GraphComponent
            >
            fn = eval(fnSerialized)
            return fn(instance)
        }, fnSerialized)
    }
}

class NodeFixture {
    constructor(
        private component: MountResultJsx,
        private page: Page,
        private id: string
    ) {}

    async getPosition(): Promise<Position> {
        const position = await this.component.evaluate((rootEl, id) => {
            const svg = rootEl.querySelector('svg') as SVGSVGElement | null
            if (!svg) throw new Error('SVG element not found')

            const rect = svg.querySelector<SVGRectElement>(`rect#${id}`)
            if (!rect) throw new Error(`Node rect '#${id}' not found`)

            // We could use the locator for `rect#${id}` to perform actions (e.g., clicks).
            // But using `this.page` and position simulates real user viewport interactions more closely.
            const rectX = parseFloat(rect.getAttribute('x')!)
            const rectY = parseFloat(rect.getAttribute('y')!)
            const rectW = parseFloat(rect.getAttribute('width')!)
            const rectH = parseFloat(rect.getAttribute('height')!)

            // one point in node-local coords (center)
            const localPoint = svg.createSVGPoint()
            localPoint.x = rectX + rectW / 2
            localPoint.y = rectY + rectH / 2

            const ctm = rect.getCTM()
            if (!ctm) throw new Error('Node CTM is unavailable')

            const globalPoint = localPoint.matrixTransform(ctm)
            return { x: globalPoint.x, y: globalPoint.y }
        }, this.id)
        return position
    }

    async createSelfLoop() {
        const position = await this.getPosition()
        await this.page.mouse.click(position.x, position.y, { button: 'right' })
    }

    async enterLabel(text: string) {
        const position = await this.getPosition()
        await this.page.mouse.click(position.x, position.y)
        // After click, input should be focused and we can type.
        await this.page.keyboard.type(text)
        await this.page.keyboard.press('Enter')
    }

    async drag(dx: number, dy: number) {
        const position = await this.getPosition()
        await this.page.mouse.move(position.x, position.y)
        await this.page.waitForTimeout(100)
        await this.page.mouse.down()
        await this.page.waitForTimeout(100)
        await this.page.mouse.move(position.x + dx, position.y + dy, { steps: 20 })
        await this.page.waitForTimeout(100)
        await this.page.mouse.up()
        await this.page.waitForTimeout(100)
    }
}
