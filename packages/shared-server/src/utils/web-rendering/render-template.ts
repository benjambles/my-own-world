import { render } from '@lit-labs/ssr';
import { CSSResult, TemplateResult } from 'lit';
import { toCssString } from '@benjambles/mow-ui/utils/styles.js';
import {
    ScriptParams,
    StylesheetParams,
    lazyStylesheetTag,
    scriptTag,
    stylesheetTag,
} from './tags.js';

export type RenderProps = {
    assets: {
        inlineStyles?: CSSResult[];
        scripts?: ScriptParams[];
        stylesheets?: StylesheetParams[];
    };
    template: TemplateResult<1> | TemplateResult<1>[];
};

type MetaData = {
    title: string;
};

export function* renderTemplate(
    data: MetaData,
    rootComponent: RenderProps,
    nodeEnv: string = 'production',
) {
    yield `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>${data.title}</title>
                ${
                    rootComponent.assets?.inlineStyles
                        ? `<style>
                              ${toCssString(rootComponent.assets?.inlineStyles, nodeEnv)}
                          </style>`
                        : ''
                }
                ${rootComponent.assets?.stylesheets
                    ?.map(({ href, lazy }) => {
                        return lazy ? lazyStylesheetTag(href) : stylesheetTag(href);
                    })
                    .join('')}
                ${rootComponent.assets?.scripts?.map(scriptTag).join('')}
    `;
    yield `</head><body>`;
    yield* render(rootComponent.template);
    yield `</body></html>`;
}

export function mergeRenderAssets(
    parent: RenderProps['assets'] = {},
    child: RenderProps['assets'] = {},
): RenderProps['assets'] {
    return {
        inlineStyles: [].concat(parent.inlineStyles, child.inlineStyles).filter(Boolean),
        scripts: [].concat(parent.scripts, child.scripts).filter(Boolean),
        stylesheets: [].concat(parent.stylesheets, child.stylesheets).filter(Boolean),
    };
}
