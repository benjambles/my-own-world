import { render, RenderResult } from '@lit-labs/ssr';

export async function renderTemplate(data, componentPath: string) {
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
    rootComponent: (data: T) => RenderResult,
) {
    yield `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>${data.meta.title}</title>
                <link href="/mow-ui/styles/global-css/base.css" rel="stylesheet" />
    `;
    yield `</head><body>`;
    yield* render(rootComponent(data));
    yield `</body></html>`;
}
