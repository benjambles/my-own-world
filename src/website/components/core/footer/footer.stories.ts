import { render } from 'lit-html';
import '../../../static/styles/base.css';
import '../../../static/styles/components/footer.css';
import { CLIENT_CONTEXT } from '../../../utils/client-context';
import { Footer } from './footer';

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
    const tpl = Footer(CLIENT_CONTEXT, { links });
    render(tpl, container);
    return container;
};
