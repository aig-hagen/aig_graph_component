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
