import '../../../static/styles/base.css';
import '../../../static/styles/components/header.css';
import '../../../static/styles/components/menu-profile.css';
import { CLIENT_CONTEXT } from '../../../utils/client-context';
import { storyRenderer } from '../../../utils/story-renderer';
import { Header } from './header';

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

export function HeaderLoggedOut() {
    return Header(CLIENT_CONTEXT, { navigationLinks, user: {} });
}

export function HeaderLoggedActiveLink() {
    return Header(CLIENT_CONTEXT, {
        navigationLinks: navigationLinksActive,
        user: {},
    });
}

export function HeaderLoggedIn() {
    return Header(CLIENT_CONTEXT, {
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
