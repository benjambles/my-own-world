import '../../../static/styles/base.css';
import '../../../static/styles/components/header.css';
import '../../../static/styles/components/menu-profile.css';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context';
import { storyRenderer } from '../../../utils/storybook/story-renderer';
import { header } from './header';

export default {
    title: 'Furniture/Header',
    decorators: [storyRenderer],
};

const navigationLinks = [
    { text: 'Explore', href: '/explore' },
    { text: 'Learn', href: '/learn' },
    { text: 'Blog', href: '/blog' },
];

const navigationLinksActive = [
    { text: 'Explore', href: '/explore', display: { active: true } },
    { text: 'Learn', href: '/learn' },
    { text: 'Blog', href: '/blog' },
];

export function headerLoggedOut() {
    return header(CLIENT_CONTEXT, { navigationLinks, user: {} });
}

export function headerLoggedActiveLink() {
    return header(CLIENT_CONTEXT, {
        navigationLinks: navigationLinksActive,
        user: {},
    });
}

export function headerLoggedIn() {
    return header(CLIENT_CONTEXT, {
        navigationLinks,
        user: {
            profile: {
                name: 'Ben Allen',
                image: 'https://via.placeholder.com/32.webp/ddd/1a1a1a?text=B',
                username: 'benjambles',
            },
        },
    });
}
