export function composedEvent<T>(name: string, detail: T) {
    return new CustomEvent(name, {
        bubbles: true,
        composed: true,
        detail,
    });
}
