import { html, render } from 'lit-html';
import '../../../static/styles/base.css';
import '../../../static/styles/components/home/home-intro.css';
import { HomeIntro } from './home-intro';

const context = {
    html,
};

export default {
    title: 'Home',
};

export const HomeIntroBlock = () => {
    const container = document.createElement('div');
    const tpl = HomeIntro(context);
    render(tpl, container);
    return container;
};
