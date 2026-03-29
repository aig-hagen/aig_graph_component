export const enum EVENT_CAUSE {
    /**
     * Indicates that an event was caused by a user action.
     */
    USER_ACTION = 'user-action',
    /**
     * Indicates that an event was caused by a programmatic action.
     */
    PROGRAMMATIC_ACTION = 'programmatic-action'
}

export function terminate(event: Event): void {
    event.preventDefault()
    event.stopPropagation()
}
