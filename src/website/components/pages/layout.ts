import Header from '../core/header';
import Footer from '../core/footer';

export default function Layout(context, data) {
    const { html } = context;

    return html`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <title>${data.meta.title}</title>
                <style>
                    html,
                    body {
                        background-color: #1a1a1a;
                        color: #fafafa;
                    }
                </style>
            </head>
            <body>
                ${Header(context, data)}
                <h1>${data.content.title}</h1>
                ${Footer(context, data)}
            </body>
        </html>
    `;
}
