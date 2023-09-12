export function composedEvent<T extends unknown>(name: string, detail: T) {
    return new CustomEvent(name, {
        bubbles: true,
        composed: true,
        detail,
    });
}
