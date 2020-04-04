import Header from '../core/header/header';
import Footer from '../core/footer/footer';

export default function Layout(context, data) {
    const { html } = context;

    return html`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <title>${data.meta.title}</title>
                <link rel="stylesheet" href="/styles/base.css" />
            </head>
            <body>
                ${Header(context, data)}
                <div class="container">
                    <h1>${data.content.title}</h1>
                </div>
                ${Footer(context, data)}
            </body>
        </html>
    `;
}
