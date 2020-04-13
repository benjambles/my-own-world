import { render } from 'lit-html';
import '../../../static/styles/base.css';
import '../../../static/styles/components/home/home-intro.css';
import { CLIENT_CONTEXT } from '../../../utils/client-context';
import { HomeIntro } from './home-intro';

export default {
    title: 'Home',
};

export const HomeIntroBlock = () => {
    const container = document.createElement('div');
    const tpl = HomeIntro(CLIENT_CONTEXT);
    render(tpl, container);
    return container;
};
