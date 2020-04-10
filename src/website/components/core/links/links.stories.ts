import { html, render } from 'lit-html';
import { NavLink } from './nav-link';

const context = {
    html,
};

export default {
    title: 'Links',
};

export const NavLinkNormal = () => {
    const container = document.createElement('div');
    const tpl = NavLink(context, { text: 'Go home', href: '/' });
    render(tpl, container);
    return container;
};
