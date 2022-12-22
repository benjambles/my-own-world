import { render } from '@lit-labs/ssr/lib/render-lit-html.js';

export async function renderTemplate(data, componentPath): Promise<Generator<string>> {
    const rootComponent = await import(componentPath);
    return iterateTemplateParts(data, rootComponent.default);
}

type PageData = {
    meta: {
        title: string;
    };
};

function* iterateTemplateParts<T extends PageData>(
    data: T,
    rootComponent: (data: T) => Iterable<string>,
): Generator<string, void, undefined> {
    yield `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>${data.meta.title}</title>
                <link href="/styles/global-css/base.css" rel="stylesheet" />
    `;
    yield `</head><body>`;
    yield* render(rootComponent(data));
    yield `</body></html>`;
}
