import navLink from '../links/nav-link';

export default function Footer(context) {
    const { html } = context;

    const footerLinks = [
        { text: 'Terms', url: '/terms' },
        { text: 'Privacy', url: '/privacy' },
        { text: 'Accessibility', url: '/accessibility' },
    ];

    return html`
        <link rel="stylesheet" href="/styles/components/footer.css" />
        <footer>
            <div class="container">
                <span>&copy; My Own World - 2020</span>
                <nav class="nav">
                    <ul>
                        ${footerLinks.map(linkData => navLink(context, linkData))}
                    </ul>
                </nav>
            <div>
        </footer>
    `;
}
