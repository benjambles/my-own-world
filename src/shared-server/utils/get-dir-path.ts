import { parse } from 'path';

export function getDirPath(importUrl: string): string {
    const { pathname } = new URL(importUrl);
    return parse(pathname.replace(/^(\/)(.*)$/, '$2')).dir;
}
