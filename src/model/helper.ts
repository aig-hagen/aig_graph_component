import { type FixedAxis, GraphNode, type NodeGUIEditability } from '@/model/graph-node'
import type { LinkGUIEditability } from '@/model/graph-link'
import type { NodeCircle, NodeRect } from '@/model/config'

/**
 * Separates a single ID or an array of IDs into node and link IDs.
 * @param ids
 * @returns A tuple containing two array, one for the node IDs and one for the link IDs.
 */
export function separateNodeAndLinkIds(
    ids: string[] | number[] | string | number
): [nodeIds: number[], linkIds: string[]] {
    let nodeIds: number[] = []
    let linkIds: string[] = []

    if (!Array.isArray(ids)) {
        if (typeof ids === 'number') {
            nodeIds = [ids]
        } else {
            linkIds = [ids]
        }
    } else {
        let idStringArray = ids.map(String)
        linkIds = idStringArray.filter((id) => id.includes('-'))
        nodeIds = idStringArray.filter((id) => !id.includes('-')).map(Number)
    }

    return [nodeIds, linkIds]
}

/**
 * Sets the fixed position for a specific node if the provided position has the correct format.
 * @param node
 * @param fixedPosition
 */
export function setAndValFixedNodePosition(
    node: GraphNode,
    fixedPosition: FixedAxis | boolean | undefined
) {
    if (fixedPosition !== undefined) {
        if (typeof fixedPosition === 'boolean') {
            if (fixedPosition) {
                node.fixedPosition = { x: true, y: true }
            } else {
                node.fixedPosition = { x: false, y: false }
            }
        } else {
            if (checkForAllNecessaryKeys(['x', 'y'], Object.keys(fixedPosition), true)) {
                node.fixedPosition = fixedPosition

                checkForNotValidKeys(['x', 'y'], Object.keys(fixedPosition), true)
            }
        }
    }
}

/**
 * Generates an SVG path that outlines a rectangle shaped node, optionally with rounded corners.
 * This is needed for the delete animation.
 * @param width - The nodes width
 * @param height - The nodes height
 * @param cornerRadius - The corner radius (equivalent to the `rx` and `ry` values of an SVG `<rect>`)
 * @returns A string representing the SVG path data (`d` attribute)
 */
export function generateRoundedRectPath(
    width: number,
    height: number,
    cornerRadius: number
): string {
    return `
        M 0,${cornerRadius}
        A ${cornerRadius},${cornerRadius} 0 0 1 ${cornerRadius},0
        H ${width - cornerRadius}
        A ${cornerRadius},${cornerRadius} 0 0 1 ${width},${cornerRadius}
        V ${height - cornerRadius}
        A ${cornerRadius},${cornerRadius} 0 0 1 ${width - cornerRadius},${height}
        H ${cornerRadius}
        A ${cornerRadius},${cornerRadius} 0 0 1 0,${height - cornerRadius}
        Z
    `
}

/**
 * Adds a backslash before special characters in a color value for use in a CSS attribute selector.
 *
 * Special characters: #, ., ,, ;, :, <, >, +, ~, ^, $, |, [, ], (, ), \, %
 *
 * @param color - The color value to escape.
 * @returns The escaped color value.
 */
export function escapeColor(color: string) {
    return color.replace(/([#.,;:<>+~^$|[\]()%\\ ])/g, '\\$1')
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
 * Determines whether a pointer interaction was probably a click, based on how close
 * the pointer down and pointer up positions are.
 *
 * This is relevant for touch devices, where we can't distinguish a pointer down event like we can with mouse buttons.

 * Actions like creating a link (triggered on pointer up) should not be executed when the user actually intended to click
 * (edit a node label). Since the click event fires after pointer up, using this check can help to avoid triggering both
 * actions on touch devices.
 *
 * @param pointerDownPos - The position where the pointer went down on a node
 * @param pointerUpPos - The position where the pointer went up
 * @param clickPosThreshold - Maximum allowed distance between down and up positions to still count as a click.
 */
export function isProbablyClick(
    pointerDownPos: { x: number; y: number },
    pointerUpPos: { x: number; y: number },
    clickPosThreshold = 2
) {
    const dx = Math.abs(pointerDownPos.x - pointerUpPos.x)
    const dy = Math.abs(pointerDownPos.y - pointerUpPos.y)
    return dx < clickPosThreshold && dy < clickPosThreshold
}

/**
 * Checks if given keys contains any not valid key options
 * @param allowedKeys
 * @param givenKeys
 * @param showErrorMessage
 */
export function checkForNotValidKeys(
    allowedKeys: (
        | keyof NodeGUIEditability
        | keyof LinkGUIEditability
        | keyof FixedAxis
        | keyof NodeCircle
        | keyof NodeRect
    )[],
    givenKeys: string[],
    showErrorMessage: boolean
): boolean {
    let isValid = true
    givenKeys.forEach((givenKey) => {
        if (
            !allowedKeys.includes(
                givenKey as
                    | keyof LinkGUIEditability
                    | keyof NodeGUIEditability
                    | keyof FixedAxis
                    | keyof NodeCircle
                    | keyof NodeRect // we actually just check if the type is keyof
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
    allowedKeys: (
        | keyof NodeGUIEditability
        | keyof LinkGUIEditability
        | keyof FixedAxis
        | keyof NodeCircle
        | keyof NodeRect
    )[],
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
