import { html } from 'lit';
import { storyRenderer } from '../../utils/storybook/story-renderer.js';
import { LinkList } from './link-list.js';
import { Meta } from '@storybook/web-components-vite';
import '../mega-menu/labelled-list.js';

const meta = {
    title: 'Components/Navigation/Link List',
    parameters: {
        component: LinkList,
    },
    decorators: [storyRenderer],
} satisfies Meta;

export default meta;

const links = {
    index: { text: 'The Rules', href: '/rules', active: false },
    quickstart: { text: 'Quickstart', href: `/rules/quick-start`, active: false },
    turnorder: { text: 'Turn Order', href: `/rules/turn-order`, active: false },
    operatives: { text: 'Operatives', href: `/rules/operatives`, active: false },
    skirmishes: { text: 'Skirmishes', href: `/rules/skirmishes`, active: false },
    campaigns: { text: 'Campaigns', href: `/rules/campaigns`, active: true },
};

export const base = () => {
    return html` <link-list>
        ${Object.values(links).map(({ href, text, active = false }) => {
            return html`<labelled-list-item ?active=${active} href=${href}
                >${text}</labelled-list-item
            >`;
        })}
    </link-list>`;
};
