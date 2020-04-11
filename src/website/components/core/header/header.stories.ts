import { html, render } from 'lit-html';
import '../../../static/styles/base.css';
import '../../../static/styles/components/header.css';
import '../../../static/styles/components/menu-profile.css';
import { Header } from './header';

const context = {
    html,
};

export default {
    title: 'Header',
};

const navigationLinks = [
    { text: 'Explore', href: '/explore', display: { light: true } },
    { text: 'Learn', href: '/learn', display: { light: true } },
    { text: 'Blog', href: '/blog', display: { light: true } },
];

const navigationLinksActive = [
    { text: 'Explore', href: '/explore', display: { light: true, active: true } },
    { text: 'Learn', href: '/learn', display: { light: true } },
    { text: 'Blog', href: '/blog', display: { light: true } },
];

export const HeaderLoggedOut = () => {
    const container = document.createElement('div');
    const tpl = Header(context, { navigationLinks, user: {} });
    render(tpl, container);
    return container;
};

export const HeaderLoggedActiveLink = () => {
    const container = document.createElement('div');
    const tpl = Header(context, {
        navigationLinks: navigationLinksActive,
        user: {},
    });
    render(tpl, container);
    return container;
};

export const HeaderLoggedIn = () => {
    const container = document.createElement('div');
    const tpl = Header(context, {
        navigationLinks,
        user: {
            profile: {
                name: 'Ben Allen',
                image: 'https://via.placeholder.com/32.webp/ddd/1a1a1a?text=B',
                username: 'benjambles',
            },
        },
    });
    render(tpl, container);
    return container;
};
