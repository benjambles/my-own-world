import { render } from '@lit-labs/ssr/lib/render-lit-html.js';

export function* iterateTemplateParts({ data, rootComponent }) {
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
