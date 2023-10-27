/**
 * The path types are used, to be able to flip the text-path element
 * that is used for the link labels.
 *
 * A line or arc should be of type reverse, when the source nodes x value is
 * bigger than the target nodes x value.
 */
export enum PathType {
    LINE = 'LINE',
    LINEREVERSE = 'LINE-REVERSE',
    ARC = 'ARC',
    ARCREVERSE = 'ARC-REVERSE',
    REFLEXIVE = 'REFLEXIVE',
}
