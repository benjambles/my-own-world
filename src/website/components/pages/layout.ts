import Header from '../core/header';
import Footer from '../core/footer';

export default function Layout(context, data) {
    const { html } = context;

    return html`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <title>${data.title}</title>
            </head>
            <body>
                ${Header(context, data)} YAY WEBSITE ${Footer(context, data)}
            </body>
        </html>
    `;
}
