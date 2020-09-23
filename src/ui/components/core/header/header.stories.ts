import { getClientComponent, storyRenderer } from '../../../utils/storybook/story-renderer';
import { header } from './header';
import './header.css';

export default {
    title: 'Furniture/Header',
    decorators: [storyRenderer],
};

const render = getClientComponent(header);

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

export const headerLoggedOut = () => render({ navigationLinks, user: {} });

export const headerLoggedActiveLink = () =>
    render({
        navigationLinks: navigationLinksActive,
        user: {},
    });

export const headerLoggedIn = () => {
    return render({
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
