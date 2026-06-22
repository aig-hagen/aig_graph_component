import * as d3 from 'd3'
import type { Canvas } from '@/d3/canvas'
import type { GridType } from '@/model/config'

export type GridSelection = d3.Selection<SVGRectElement, undefined, any, any>
export type GridPattern = d3.Selection<SVGPatternElement, undefined, any, any>

export type GridResult = {
    gridRect: GridSelection
    gridPattern: GridPattern
}

function patternDimensions(cellSize: number, gridType: GridType): { width: number; height: number } {
    if (gridType === 'rhombus') {
        return { width: cellSize, height: cellSize * Math.sqrt(3) }
    }
    return { width: cellSize, height: cellSize }
}

function patternPath(cellSize: number, gridType: GridType): string {
    if (gridType === 'rhombus') {
        const rowH = cellSize * Math.sqrt(3) / 2  // vertical distance between intersection rows
        const tileH = rowH * 2                     // tile covers two rows so the diagonal is continuous
        const half = cellSize / 2
        return [
            `M 0 0 L ${cellSize} 0`,               // horizontal line at top of tile
            `M 0 ${rowH} L ${cellSize} ${rowH}`,   // horizontal line at mid-tile
            `M 0 0 L ${half} ${rowH} L ${cellSize} ${tileH}` // continuous diagonal through both rows
        ].join(' ')
    }
    return `M ${cellSize} 0 L 0 0 0 ${cellSize}`
}

export function createGrid(
    canvas: Canvas,
    hostId: string,
    cellSize: number,
    visible: boolean,
    gridType: GridType = 'square'
): GridResult {
    const patternId = `grid-pattern-${hostId}`
    const { width, height } = patternDimensions(cellSize, gridType)

    const gridPattern = canvas
        .append<SVGDefsElement>('defs')
        .append<SVGPatternElement>('pattern')
        .attr('id', patternId)
        .attr('width', width)
        .attr('height', height)
        .attr('patternUnits', 'userSpaceOnUse')

    gridPattern
        .append('path')
        .attr('d', patternPath(cellSize, gridType))
        .attr('fill', 'none')
        .attr('stroke', '#ddd')
        .attr('stroke-width', 1)

    const gridRect = canvas
        .append<SVGRectElement>('rect')
        .attr('class', 'graph-controller__grid-background')
        .attr('x', -100000)
        .attr('y', -100000)
        .attr('width', 200000)
        .attr('height', 200000)
        .attr('fill', `url(#${patternId})`)
        .style('pointer-events', 'none')

    setGridVisible(gridRect, visible)

    return { gridRect, gridPattern }
}

export function updateGridPattern(
    gridPattern: GridPattern,
    cellSize: number,
    gridType: GridType
): void {
    const { width, height } = patternDimensions(cellSize, gridType)
    gridPattern
        .attr('width', width)
        .attr('height', height)
        .select('path')
        .attr('d', patternPath(cellSize, gridType))
}

export function setGridVisible(gridRect: GridSelection, visible: boolean): void {
    if (visible) {
        gridRect.style('display', null)
    } else {
        gridRect.style('display', 'none')
    }
}
