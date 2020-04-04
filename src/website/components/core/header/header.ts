import navLink from '../links/nav-link';

export default function Header(context) {
    const { html } = context;

    const navLinks = [
        { text: 'Explore', url: '/explore' },
        { text: 'Get started', url: '/register' },
    ];

    const accountNavLinks = [
        { text: 'Sign in', url: '/login' },
        { text: 'Sign up', url: '/join' },
    ];

    return html`
        <link rel="stylesheet" href="/styles/components/header.css" />
        <header>
            <div class="container">
                <a href="/" class="logo">My Own World</a>

                <nav class="nav primary-nav">
                    <ul>
                        ${navLinks.map(linkData => navLink(context, linkData))}
                    </ul>
                </nav>

                <div class="nav account-nav">
                    <ul>
                        ${accountNavLinks.map(linkData => navLink(context, linkData))}
                    </ul>
                </div>
            </div>
        </header>
    `;
}
