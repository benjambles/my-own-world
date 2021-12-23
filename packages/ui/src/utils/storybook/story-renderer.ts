import { render, TemplateResult } from 'lit';

/**
 * Renders a Lit-HTML template into a container for storybook
 * @param story
 */
export function storyRenderer(story: () => TemplateResult) {
    const container = document.createElement('div');
    render(story(), container);
    return container;
}

/**
 * Renders a Lit-HTML template into a container for storybook
 * @param story
 */
export function linkStoryRenderer(story: () => TemplateResult) {
    const container = document.createElement('div');
    container.style.padding = '20px';
    render(story(), container);
    return container;
}
