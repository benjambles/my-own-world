import { dirname } from 'path';
import { fileURLToPath } from 'url';

export function getDirPath(importUrl: string): string {
    return dirname(fileURLToPath(importUrl));
}
