import { test, expect, type MountResultJsx } from '@playwright/experimental-ct-vue'
import GraphComponent from '@/components/GraphComponent.vue'
import type { ComponentPublicInstance } from 'vue'

test('show controls if empty', async ({ mount, page }) => {
    const component = await mount(<GraphComponent />)

    await expect(component.getByText('Controls')).toBeVisible()
    await expect(page).toHaveScreenshot()
})

test('create loop', async ({ mount, page }) => {
    const position = { x: 150, y: 150 }
    const component = await mount(<GraphComponent />)
    await component.dblclick({ position })

    await component.click({ position, button: 'right' })

    await expect(page).toHaveScreenshot()
})

test('update label', async ({ mount, page }) => {
    const position = { x: 150, y: 150 }
    const component = await mount(<GraphComponent />)
    await component.dblclick({ position })

    await component.click({ position })
    // After click, input should be focused and we can type.
    await page.keyboard.type('a label')
    await page.keyboard.press('Enter')

    await expect(page).toHaveScreenshot()
})

test('getNodeSize', async ({ mount }) => {
    const position = { x: 150, y: 150 }
    const component = await mount(<GraphComponent />)
    await component.dblclick({ position })
    const nodeSize = await evaluateOnComponent(component, (instance) => instance.getNodeSize(0))
    expect(nodeSize).toEqual({ height: 48, width: 128 })
})

// XXX: This is a discouraged pattern.
// Components should communicate only via props and emits.
// However, the graph component relies heavily on methods exposed via `defineExpose()`,
// because it can also be used as a custom element.
// This pattern is therefore kept in place to test those exposed methods.
async function evaluateOnComponent<ReturnT>(
    component: MountResultJsx,
    fn: (instance: InstanceType<typeof GraphComponent>) => ReturnT
) {
    return await component.evaluate((rootEl, fnSerialized) => {
        const instance = (rootEl as any)._vnode.component.subTree.component.exposed as InstanceType<
            typeof GraphComponent
        >
        fn = eval(fnSerialized)
        return fn(instance)
    }, fn.toString())
}
