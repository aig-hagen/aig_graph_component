import { GraphNode } from '@/model/graph-node'
import type { GraphLink } from '@/model/graph-link'
import type { GraphHost } from '@/d3/canvas'

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

export function triggerLabelEdited(parent: GraphNode | GraphLink, label: string, host: GraphHost) {
    const eventLabelClicked = new CustomEvent('labeledited', {
        detail: {
            parent: { id: parent.id },
            label: label
        }
    })
    host.node()!.dispatchEvent(eventLabelClicked)
}
