import { render, TemplateResult } from 'lit-html';
import { CLIENT_CONTEXT } from '../templates/client-context.js';
import { LitTpl } from '../templates/lit-tpl.js';

export function getClientComponent<T>(component: LitTpl<T>) {
    return (args: T) => component(CLIENT_CONTEXT, args);
}

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
