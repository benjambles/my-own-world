import { render } from '@lit-labs/ssr';
import { TemplateResult } from 'lit';

type PageData = {
    meta: {
        title: string;
    };
};

export function* iterateTemplateParts<T extends PageData>(
    data: T,
    rootComponent: {
        assets: {
            styles: { href: string; lazy?: boolean }[];
            scripts: { src: string; async?: boolean; defer?: boolean }[];
        };
        render: (data: T) => TemplateResult;
    },
) {
    yield `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>${data.meta.title}</title>
                <link href="/mow-ui/styles/global-css/base.css" rel="stylesheet" />
                ${rootComponent.assets?.styles
                    ?.map(({ href, lazy }) => {
                        return lazy ? lazyStyle(href) : style(href);
                    })
                    .join('')}
    `;
    yield `</head><body>`;
    yield* render(rootComponent.render(data));
    yield `</body></html>`;
}

function lazyStyle(href: string) {
    return `<link rel="preload" href="${href}" as="style" onload="this.rel='stylesheet'" />`;
}

function style(href: string) {
    return `<link rel="stylesheet" href="${href}" />`;
}
