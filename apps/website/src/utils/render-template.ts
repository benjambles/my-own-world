import { render } from '@lit-labs/ssr';
import { TemplateResult } from 'lit';

export type ScriptParams = { src: string; lazy?: string; module?: boolean };
export type StylesheetParams = { href: string; lazy?: boolean };
export type RenderProps = {
    assets: {
        scripts: ScriptParams[];
        styles: StylesheetParams[];
    };
    template: TemplateResult<1> | TemplateResult<1>[];
};

type MetaData = {
    meta: {
        title: string;
    };
};

export function* renderTemplate<T extends MetaData>(data: T, rootComponent: RenderProps) {
    yield `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>${data.meta.title}</title>

                ${rootComponent.assets.styles
                    .map(({ href, lazy }) => {
                        return lazy ? lazyStyleTag(href) : styleTag(href);
                    })
                    .join('')}
                ${rootComponent.assets.scripts.map(scriptTag).join('')}
    `;
    yield `</head><body>`;
    yield* render(rootComponent.template);
    yield `</body></html>`;
}

export function lazyStyleTag(href: string) {
    return `<link rel="preload" href="${href}" as="style" onload="this.rel='stylesheet'" />`;
}

export function styleTag(href: string) {
    return `<link rel="stylesheet" href="${href}" />`;
}

export function scriptTag({ lazy, module, src }: ScriptParams) {
    return `<script src="${src}" ${lazy ?? ''} ${
        module ? 'type="module"' : ''
    }></script>`;
}
