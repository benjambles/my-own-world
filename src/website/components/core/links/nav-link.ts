export default function NavLink(context, { text, url }) {
    const { html } = context;

    return html`<li><a href=${url}>${text}</a></li>`;
}
