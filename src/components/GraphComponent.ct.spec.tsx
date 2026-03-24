import { test, expect } from '@playwright/experimental-ct-vue'
import GraphComponent from '@/components/GraphComponent.vue'

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
