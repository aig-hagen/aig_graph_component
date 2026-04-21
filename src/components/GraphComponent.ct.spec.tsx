import { test as base, expect, type MountResultJsx } from '@playwright/experimental-ct-vue'
import GraphComponent from '@/components/GraphComponent.vue'
import type { Page } from 'playwright/test'
import { NodeShape, type jsonGraph, type NodeProps, type PositionSnapshot } from '@/main.lib'

const DEFAULT_WAIT_FOR_RERENDER_MS = 100

type EventState = {
    onNodesMoved: {
        last: PositionSnapshot[] | undefined
        all: PositionSnapshot[][]
    }
}

// Use fixtures for cleaner tests.
// See https://playwright.dev/docs/test-fixtures
const test = base.extend<{ events: EventState; component: MountResultJsx; graph: GraphFixture }>({
    events: async ({}, use) => {
        const state: EventState = {
            onNodesMoved: {
                last: undefined,
                all: []
            }
        }
        await use(state)
    },
    component: async ({ events, mount }, use) => {
        const component = await mount(
            <GraphComponent
                id="1-test-graph"
                onNodesMoved={(positions) => {
                    events.onNodesMoved.last = positions
                    events.onNodesMoved.all.push(positions)
                }}
            />
        )
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

    await graph.evaluateOnComponentWithWait((instance) =>
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

    await graph.evaluateOnComponentWithWait((instance) =>
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

    await graph.evaluateOnComponentWithWait((instance) =>
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

test('setting graph', async ({ graph, page }) => {
    await graph.evaluateOnComponentWithWait((instance) =>
        instance.setGraph({
            nodes: [
                {
                    id: 0,
                    label: 'a',
                    x: 100,
                    y: 100
                },
                {
                    id: 1,
                    label: 'b',
                    x: 400,
                    y: 200
                }
            ],
            links: [
                {
                    sourceId: 0,
                    targetId: 1
                }
            ]
        })
    )

    await expect(page).toHaveScreenshot()
})

test('restore zoom', async ({ graph, page }) => {
    await graph.evaluateOnComponent((instance) => instance.toggleZoom(true))
    await graph.evaluateOnComponent((instance) => instance.toggleNodeAutoGrow(false))
    await graph.createNode({ x: 100, y: 100 })
    await graph.createNode({ x: 400, y: 200 })
    await graph.evaluateOnComponentWithWait((instance) =>
        instance.centerView({ top: 5, right: 25, bottom: 50, left: 100 })
    )

    await graph.evaluateOnComponentWithWait((instance) =>
        instance.setGraph(
            {
                nodes: [
                    {
                        id: 0,
                        label: 'a',
                        x: 100,
                        y: 100
                    },
                    {
                        id: 1,
                        label: 'b',
                        x: 400,
                        y: 200
                    }
                ],
                links: [
                    {
                        sourceId: 0,
                        targetId: 1
                    }
                ]
            },
            true
        )
    )

    await expect(page).toHaveScreenshot()
})

test('dragging nodes triggers event', async ({ graph, events }) => {
    const node = await graph.createNode({ x: 150, y: 150 })

    await node.drag(100, 100)

    expect(events.onNodesMoved.last).toEqual([
        {
            nodeId: 0,
            x: 250,
            y: 250
        }
    ])
    expect(events.onNodesMoved.all).toHaveLength(1)
})

test('simulation triggers event', async ({ graph, events, page }) => {
    await graph.createNode({ x: 150, y: 150 })

    await graph.createNode({ x: 175, y: 175 })

    await waitForNodePositionsToSettle(page)
    await page.waitForTimeout(15_000)
    // NOTE Not sure, how deterministic d3 simulations are.
    // But for now this works.
    // When this starts breaking tests,
    // `closeTo` can be used like `y: expect.closeTo(116)`.
    expect(events.onNodesMoved.last).toEqual([
        {
            nodeId: 0,
            x: 64,
            y: 116.51542729288529
        },
        {
            nodeId: 1,
            x: 264.29219388563916,
            y: 208.48457270711475
        }
    ])
    expect(events.onNodesMoved.all).toHaveLength(1)
})

test.describe('renders links', () => {
    function getGraphForLinkDrawingTest(nodeProps?: NodeProps): jsonGraph {
        return {
            nodes: [
                {
                    id: 1,
                    x: -150,
                    y: -150,
                    props: nodeProps
                },
                {
                    id: 2,
                    x: -150,
                    y: 300,
                    props: nodeProps
                },
                {
                    id: 3,
                    x: 150,
                    y: -150,
                    props: nodeProps
                },
                {
                    id: 4,
                    x: 150,
                    y: 300,
                    props: nodeProps
                }
            ],
            links: [
                {
                    sourceId: 1,
                    targetId: 2
                },
                {
                    sourceId: 2,
                    targetId: 1
                },
                {
                    sourceId: 1,
                    targetId: 3
                },
                {
                    sourceId: 3,
                    targetId: 1
                },
                {
                    sourceId: 1,
                    targetId: 1
                },
                {
                    sourceId: 2,
                    targetId: 2
                },
                {
                    sourceId: 3,
                    targetId: 3
                },
                {
                    sourceId: 4,
                    targetId: 4
                },
                {
                    sourceId: 3,
                    targetId: 4
                }
            ]
        }
    }

    const cases: { label: string; props: NodeProps }[] = [
        { label: 'with circles', props: { shape: NodeShape.CIRCLE, radius: 39 } },
        {
            label: 'with rectangles',
            props: {
                shape: NodeShape.RECTANGLE,
                height: 47,
                width: 32,
                cornerRadius: 3,
                reflexiveEdgeStart: 'MOVABLE'
            }
        }
    ]
    cases.forEach(({ label, props }) => {
        test(label, async ({ graph, page }) => {
            await graph.evaluateOnComponent((instance) => instance.toggleZoom(true))
            await graph.evaluateOnComponent((instance) => instance.toggleNodeAutoGrow(false))
            const graphData = getGraphForLinkDrawingTest(props)
            await graph.evaluateOnComponentWithWait(
                (instance, graphData) => instance.setGraph(graphData),
                graphData
            )
            await graph.evaluateOnComponentWithWait((instance) =>
                instance.centerView({ top: 50, right: 50, bottom: 50, left: 50 })
            )

            await expect(page).toHaveScreenshot()
        })
    })
})

interface Position {
    x: number
    y: number
}

async function waitForNodePositionsToSettle(page: Page) {
    await page.waitForFunction(() => {
        const transforms = ((window as any).__waitForNodePositionsToSettle_transforms ||= new Array<
            string | null
        >())
        const nodes = [...document.getElementsByClassName('graph-controller__node-container')]
        let changeDetected = false
        nodes.forEach((node, idx) => {
            const saveTransform = transforms[idx]
            const newTransform = node.getAttribute('transform')
            if (saveTransform !== newTransform) {
                transforms[idx] = newTransform
                changeDetected = true
            }
        })
        if (transforms.length > nodes.length) {
            transforms.splice(nodes.length)
            changeDetected = true
        }
        // Reset for next invocation of `waitForNodePositionsToSettle`.
        if (!changeDetected) {
            transforms.splice(0)
        }
        return !changeDetected
    })
}

class GraphFixture {
    constructor(
        private component: MountResultJsx,
        private page: Page
    ) {}

    private async getAllNodeIds(): Promise<string[]> {
        return await this.component
            .locator('rect[id^="1-test-graph-"]')
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
        await waitForNodePositionsToSettle(this.page)
        return new NodeFixture(this.component, this.page, newId)
    }

    // XXX: This is a discouraged pattern.
    // Components should communicate only via props and emits.
    // However, the graph component relies heavily on methods exposed via `defineExpose()`,
    // because it can also be used as a custom element.
    // This pattern is therefore kept in place to test those exposed methods.
    async evaluateOnComponent<ReturnT, ArgT>(
        fn: (instance: InstanceType<typeof GraphComponent>, arg: ArgT) => ReturnT,
        arg?: ArgT
    ) {
        const fnSerialized = fn.toString()
        return await this.component.evaluate(
            (rootEl, [fnSerialized, arg]) => {
                const instance = (rootEl as any).__vnode.ctx.exposed as InstanceType<
                    typeof GraphComponent
                >
                fn = eval(fnSerialized as string)
                return fn(instance, arg as ArgT)
            },
            [fnSerialized, arg as ArgT]
        )
    }

    // Use if evaluate causes some side effect like moving node etc.
    // Otherwise, use `evaluateOnComponent` to avoid unnecessary waits.
    async evaluateOnComponentWithWait<ReturnT, ArgT>(
        fn: (instance: InstanceType<typeof GraphComponent>, arg: ArgT) => ReturnT,
        arg?: ArgT
    ) {
        const result = await this.evaluateOnComponent(fn, arg)
        await this.page.waitForTimeout(DEFAULT_WAIT_FOR_RERENDER_MS)
        return result
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

            const rect = svg.querySelector<SVGRectElement>(`rect#${CSS.escape(id)}`)
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
        await this.page.waitForTimeout(DEFAULT_WAIT_FOR_RERENDER_MS)
        await this.page.mouse.down()
        await this.page.waitForTimeout(DEFAULT_WAIT_FOR_RERENDER_MS)
        await this.page.mouse.move(position.x + dx, position.y + dy, { steps: 20 })
        await this.page.waitForTimeout(DEFAULT_WAIT_FOR_RERENDER_MS)
        await this.page.mouse.up()
        await waitForNodePositionsToSettle(this.page)
    }
}
