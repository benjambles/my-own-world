import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { storyRenderer } from '../../utils/storybook/story-renderer.js';
import type { PaginationProps } from './mow-pagination.js';
import './mow-pagination.js';

export default {
    title: 'Components/Pagination',
    parameters: {
        componentSubtitle: 'Pagination',
    },
    decorators: [storyRenderer],
} as Meta;

const Template = (args: PaginationProps) =>
    html`<mow-pagination
        clickEventName=${args.clickEventName}
        itemCount=${args.itemCount}
        limit=${args.limit}
        maxLinks=${args.maxLinks}
        offset=${args.offset}
        rootUrl=${args.rootUrl}
    ></mow-pagination>`;

export const Playground = Template.bind({});
Playground.args = {
    clickEventName: 'mow:pagination.click',
    itemCount: 180,
    limit: 30,
    offset: 0,
    maxLinks: 10,
    rootUrl: '/',
};
Playground.argTypes = {
    clickEventName: { control: { type: 'text', required: false } },
    itemCount: { control: { type: 'number', required: true } },
    limit: { control: { type: 'number', required: false } },
    offset: { control: { type: 'number', required: false } },
    maxLinks: { control: { type: 'number', required: false } },
    rootUrl: { control: { type: 'text', required: true } },
};

export const Base = () => {
    return html`<mow-pagination itemCount="180"></mow-pagination>`;
};
Base.storyName = 'default';

export const OnePage = () => {
    return html`<mow-pagination itemCount="10"></mow-pagination>`;
};

export const FullDisplay = () => {
    return html`<mow-pagination itemCount="180"></mow-pagination>`;
};

export const OffsetDisplay = () => {
    return html`<mow-pagination itemCount="600"></mow-pagination>`;
};
