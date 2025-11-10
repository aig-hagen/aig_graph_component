import { GraphNode } from '@/model/graph-node'
import type { GraphLink } from '@/model/graph-link'
import type { GraphHost } from '@/d3/canvas'
import type { NodeSize } from '@/model/config'

export const enum EVENT_CAUSE {
    USER_ACTION = 'user-action',
    PROGRAMMATIC_ACTION = 'programmatic-action'
}

export function triggerNodeCreated(node: GraphNode, host: GraphHost, cause: EVENT_CAUSE) {
    const eventNodeCreated = new CustomEvent('nodecreated', {
        detail: {
            node: { id: node.id, label: node.label, x: node.x, y: node.y },
            cause: cause
        }
    })
    host.node()!.dispatchEvent(eventNodeCreated)
}

export function triggerLinkCreated(link: GraphLink, host: GraphHost, cause: EVENT_CAUSE) {
    const eventLinkCreated = new CustomEvent('linkcreated', {
        detail: {
            link: { id: link.id, label: link.label },
            cause: cause
        }
    })
    host.node()!.dispatchEvent(eventLinkCreated)
}

export function triggerNodeClicked(node: GraphNode, button: number, host: GraphHost) {
    const eventNodeClicked = new CustomEvent('nodeclicked', {
        detail: {
            node: { id: node.id, label: node.label, x: node.x, y: node.y },
            button: button
        }
    })
    host.node()!.dispatchEvent(eventNodeClicked)
}

export function triggerLinkClicked(link: GraphLink, button: number, host: GraphHost) {
    const eventLinkClicked = new CustomEvent('linkclicked', {
        detail: {
            link: { id: link.id, label: link.label },
            button: button
        }
    })
    host.node()!.dispatchEvent(eventLinkClicked)
}

export function triggerNodeDeleted(node: GraphNode, host: GraphHost, cause: EVENT_CAUSE) {
    const eventNodeDeleted = new CustomEvent('nodedeleted', {
        detail: {
            node: { id: node.id, label: node.label, x: node.x, y: node.y },
            cause: cause
        }
    })
    host.node()!.dispatchEvent(eventNodeDeleted)
}

export function triggerLinkDeleted(link: GraphLink, host: GraphHost, cause: EVENT_CAUSE) {
    const eventLinkDeleted = new CustomEvent('linkdeleted', {
        detail: {
            link: { id: link.id, label: link.label },
            cause: cause
        }
    })
    host.node()!.dispatchEvent(eventLinkDeleted)
}

export function triggerLabelEdited(parent: GraphNode | GraphLink, label: string, host: GraphHost) {
    const eventLabelEdited = new CustomEvent('labeledited', {
        detail: {
            parent: { id: parent.id },
            label: label
        }
    })
    host.node()!.dispatchEvent(eventLabelEdited)
}

export function triggerNodeRenderedSizeChange(
    node: GraphNode,
    previousRenderedSize: NodeSize,
    host: GraphHost
) {
    const eventLabelRenderedSizeChange = new CustomEvent('noderenderedsizechange', {
        detail: {
            node: { id: node.id, renderedSize: node.renderedSize, baseSize: node.getSize() },
            previousRenderedSize: previousRenderedSize
        }
    })
    host.node()!.dispatchEvent(eventLabelRenderedSizeChange)
}

export function terminate(event: Event): void {
    event.preventDefault()
    event.stopPropagation()
}
