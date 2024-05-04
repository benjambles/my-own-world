import { render, TemplateResult } from 'lit';
import {
    fontSizes,
    oxaniumFont,
    resetStyles,
    rootVars,
} from '../../global-css/index.styles.js';

const siteStyles = [rootVars, oxaniumFont, resetStyles, fontSizes];

/**
 * Renders a Lit-HTML template into a container for storybook
 * @param story
 */
export function linkStoryRenderer(story: () => TemplateResult) {
    const siteStylesheet = document.createElement('style');
    siteStylesheet.innerText = siteStyles.map((val) => val.toString()).join('');

    const container = document.createElement('div');
    container.style.padding = '20px';
    render(story(), container);

    container.appendChild(siteStylesheet);
    return container;
}

/**
 * Renders a Lit-HTML template into a container for storybook
 * @param story
 */
export function storyRenderer(story: () => TemplateResult) {
    const siteStylesheet = document.createElement('style');
    siteStylesheet.innerText = siteStyles.map((val) => val.toString()).join('');

    const container = document.createElement('div');
    render(story(), container);

    container.appendChild(siteStylesheet);
    return container;
}
