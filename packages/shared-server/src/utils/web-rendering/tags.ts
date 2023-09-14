export type ScriptParams = { src: string; lazy?: string; module?: boolean };
export type StylesheetParams = { href: string; lazy?: boolean };

export function lazyStylesheetTag(href: string) {
    return `<link rel="preload" href="${href}" as="style" onload="this.rel='stylesheet'" />`;
}

export function stylesheetTag(href: string) {
    return `<link rel="stylesheet" href="${href}" />`;
}

export function scriptTag({ lazy, module, src }: ScriptParams) {
    return `<script src="${src}" ${lazy ?? ''} ${
        module ? 'type="module"' : ''
    }></script>`;
}
