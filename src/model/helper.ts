import type { FixedAxis, NodeGUIEditability } from '@/model/graph-node'
import type { LinkGUIEditability } from '@/model/graph-link'

/**
 * Adds a backslash before special characters in a color value for use in a CSS attribute selector.
 *
 * Special characters: #, ., ,, ;, :, <, >, +, ~, ^, $, |, [, ], (, ), \
 *
 * @param color - The color value to escape.
 * @returns The escaped color value.
 */
export function escapeColor(color: string) {
    return color.replace(/([#.,;:<>+~^$|[\]()\\/])/g, '\\$1')
}

/**
 * Releases the pointer capture.
 * This is necessary for touch devices because of the implicit pointer strategy.
 * Otherwise, pointerover, pointerenter, pointerleave, and pointerout would not fire
 * as long as the capture is set.
 * @param event
 */
export function releaseImplicitPointerCapture(event: PointerEvent) {
    let target = event.target as Element
    if (target.hasPointerCapture(event.pointerId)) {
        target.releasePointerCapture(event.pointerId)
    }
}

/**
 * Checks if given keys contains any not valid key options
 * @param allowedKeys
 * @param givenKeys
 * @param showErrorMessage
 */
export function checkForNotValidKeys(
    allowedKeys: (keyof NodeGUIEditability | keyof LinkGUIEditability | keyof FixedAxis)[],
    givenKeys: string[],
    showErrorMessage: boolean
): boolean {
    let isValid = true
    givenKeys.forEach((givenKey) => {
        if (
            !allowedKeys.includes(
                givenKey as keyof LinkGUIEditability | keyof NodeGUIEditability | keyof FixedAxis // we actually just check if the type is keyof
            )
        ) {
            isValid = false
            if (showErrorMessage) {
                showError(
                    `Option not valid: ${givenKey}`,
                    `Use the following: ${allowedKeys.join(', ')}.`
                )
            }
        }
    })
    return isValid
}

/**
 * Checks if given keys contain all necessary key option
 * @param allowedKeys
 * @param givenKeys
 * @param showErrorMessage
 */
export function checkForAllNecessaryKeys(
    allowedKeys: (keyof NodeGUIEditability | keyof LinkGUIEditability | keyof FixedAxis)[],
    givenKeys: string[],
    showErrorMessage: boolean
): boolean {
    let isValid = true
    let difference = allowedKeys.filter((key) => !givenKeys.includes(key))
    if (difference.length > 0) {
        isValid = false
        if (showErrorMessage) {
            showError(`Option missing`, `Add: ${difference}`)
        }
    }

    return isValid
}

export function showError(title: string, message: any) {
    console.error(title + '\n' + message)
}
