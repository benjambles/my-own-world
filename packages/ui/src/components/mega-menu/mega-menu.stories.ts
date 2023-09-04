import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { storyRenderer } from '../../utils/storybook/story-renderer.js';
import './labelled-list.js';
import { MegaMenu } from './mega-menu.js';

export default {
    title: 'Components/Mega Menu',
    parameters: {
        componentSubtitle: '',
        component: MegaMenu,
    },
    decorators: [storyRenderer],
} as Meta;

const data = [
    {
        links: [
            { href: '/', title: 'Home' },
            { href: '/setting', title: 'The Setting' },
            { href: '/rules', title: 'The Rules' },
            { href: '/downloads', title: 'Downloads' },
            { href: '/tools', title: 'Tools' },
            { href: '/faq', title: 'FAQ' },
            { href: '/contact', title: 'Contact Us' },
        ],
    },
    {
        title: 'The rules',
        links: [
            { href: '/rules', title: 'Quick Start' },
            { href: '/rules/turn-sequence', title: 'Turn sequence' },
            { href: '/rules/operatives', title: 'Operatives' },
            { href: '/rules/skirmishes', title: 'Skirmishes' },
            { href: '/rules/campaigns', title: 'Campaigns' },
        ],
    },
    {
        title: 'The Setting',
        links: [
            { href: '/explore', title: 'The Universe' },
            { href: '/explore/timeline', title: 'The timeline' },
            { href: '/explore/factions', title: 'The factions' },
            { href: '/explore/locations', title: 'The locations' },
        ],
    },
];

export const megaMenu = () => {
    return html`<mega-menu>
        ${data.map(
            ({ links, title }, index) => html`
                <labelled-list
                    header=${ifDefined(title)}
                    type="${index === 0 ? 'primary' : 'secondary'}"
                >
                    ${links.map(
                        ({ href, title }) => html`
                            <labelled-list-item href="${href}">
                                ${title}
                            </labelled-list-item>
                        `,
                    )}
                </labelled-list>
            `,
        )}
    </mega-menu>`;
};
