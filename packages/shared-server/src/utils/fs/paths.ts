import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

/**
 * When given an import.meta.url value it ensures that windows/*nix etc
 * behave the same way. Windows paths are prefixed with a `/` and the drive name
 * which prevents resolve from working correctly.
 * @param importUrl
 * @returns
 */
export function getDirPath(importUrl: string): string {
    return dirname(fileURLToPath(importUrl));
}

/**
 * Wrapped resolve allowing relative imports to
 * work across platform when using import.meta.url
 * @param baseUrl
 * @param pathSegments
 * @returns
 */
export function resolveImportPath(baseUrl: string, ...pathSegments: string[]): string {
    const modulePath = getDirPath(baseUrl);
    return resolve(modulePath, ...pathSegments);
}
