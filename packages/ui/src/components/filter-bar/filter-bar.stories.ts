import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { storyRenderer } from '../../utils/storybook/story-renderer.js';
import './filter-bar.js';

export default {
    title: 'Components/Filter Bar',
    parameters: {
        componentSubtitle: 'Displays a filter bar component',
    },
    decorators: [storyRenderer],
} as Meta;

export const base = () => {
    return html`
        <filter-bar>
            <filter-item href="?type=all" filter="all">All</filter-item>
            <filter-item href="?type=campaign" filter="campaign">Campaign</filter-item>
            <filter-item href="?type=skirmish" filter="skirmish">Skirmish</filter-item>
        </filter-bar>
    `;
};
base.storyName = 'default';
