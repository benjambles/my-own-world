import { render, TemplateResult } from 'lit-html';
import { CLIENT_CONTEXT } from '../templates/client-context';
import { LitTpl } from '../templates/lit-tpl';

export const getClientComponent = <T>(component: LitTpl<T>) => (args: T) => {
    return component(CLIENT_CONTEXT, args);
};

/**
 * Renders a Lit-HTML template into a container for storybook
 * @param story
 */
export const storyRenderer = (story: () => TemplateResult) => {
    const container = document.createElement('div');
    render(story(), container);
    return container;
};

/**
 * Renders a Lit-HTML template into a container for storybook
 * @param story
 */
export const linkStoryRenderer = (story: () => TemplateResult) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    render(story(), container);
    return container;
};
