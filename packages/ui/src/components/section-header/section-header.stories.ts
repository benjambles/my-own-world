import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { storyRenderer } from '../../utils/storybook/story-renderer.js';
import './section-header.js';

export default {
    title: 'Components/Navigation/Section Header',
    parameters: {
        componentSubtitle: 'Section Header',
    },
    decorators: [storyRenderer],
} as Meta;

export const base = () => {
    return html`
        <section-header sectionname="Roster">
            <a slot="root-link" href="/tools">Tools</a>
            <a href="/tools/scenarios">Scenario Builder</a>
            <a href="/tools/npcs">NPC Builder</a>
        </section-header>
    `;
};
base.storyName = 'default';
