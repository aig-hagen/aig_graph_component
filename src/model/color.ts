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
