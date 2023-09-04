export function composedEvent<T extends unknown>(name: string, detail: T) {
    return new CustomEvent(name, {
        detail,
        composed: true,
        bubbles: true,
    });
}
