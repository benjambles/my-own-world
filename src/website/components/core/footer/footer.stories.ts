import { html, render } from 'lit-html';
import '../../../static/styles/base.css';
import '../../../static/styles/components/footer.css';
import { Footer } from './footer';

const context = {
    html,
};

export default {
    title: 'Footer',
};

const links = [
    { text: 'Terms', href: '/terms' },
    { text: 'Privacy', href: '/privacy' },
    { text: 'Accessibility', href: '/accessibility' },
];

export const FooterNormal = () => {
    const container = document.createElement('div');
    const tpl = Footer(context, { links });
    render(tpl, container);
    return container;
};
