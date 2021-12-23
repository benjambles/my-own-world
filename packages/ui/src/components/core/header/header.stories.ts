import { storyRenderer } from '../../../utils/storybook/story-renderer.js';
import './header.css';
import { header } from './header.js';

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

export const headerLoggedOut = () => header({ navigationLinks, user: {} });

export const headerLoggedActiveLink = () =>
    header({
        navigationLinks: navigationLinksActive,
    });

export const headerLoggedIn = () => {
    return header({
        navigationLinks,
        user: {
            profile: {
                name: 'Ben Allen',
                image: 'https://via.placeholder.com/32.webp/ddd/1a1a1a?text=B',
                username: 'benjambles',
            },
        },
    });
};
