import { html, render } from 'lit-html';
import { Link } from './link';
import '../../../static/styles/utils/tests.css';

const context = {
    html,
};

export default {
    title: 'Links',
};

export const LinkNormal = () => {
    const container = document.createElement('div');
    container.classList.add('light-box');
    const tpl = Link(context, { text: 'Go home', href: '/' });
    render(tpl, container);
    return container;
};

export const LinkActive = () => {
    const container = document.createElement('div');
    container.classList.add('light-box');
    const tpl = Link(context, { text: 'Go home', href: '/', active: true });
    render(tpl, container);
    return container;
};

export const LinkUnderline = () => {
    const container = document.createElement('div');
    container.classList.add('light-box');
    const tpl = Link(context, { text: 'Go home', href: '/', classes: { underlined: true } });
    render(tpl, container);
    return container;
};

export const LinkLight = () => {
    const container = document.createElement('div');
    container.classList.add('dark-box');
    const tpl = Link(context, { text: 'Go home', href: '/', classes: { 'light-link': true } });
    render(tpl, container);
    return container;
};

export const LightLinkActive = () => {
    const container = document.createElement('div');
    container.classList.add('dark-box');
    const tpl = Link(context, {
        text: 'Go home',
        href: '/',
        active: true,
        classes: { 'light-link': true },
    });
    render(tpl, container);
    return container;
};

export const LightLinkUnderline = () => {
    const container = document.createElement('div');
    container.classList.add('dark-box');
    const tpl = Link(context, {
        text: 'Go home',
        href: '/',
        classes: { underlined: true, 'light-link': true },
    });
    render(tpl, container);
    return container;
};
