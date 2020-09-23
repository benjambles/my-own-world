import { storyRenderer } from '../../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../../utils/templates/client-context';
import { home } from './home';
import './home-intro/home-intro.css';
import { mockData } from '../../../../utils/mock-data';
import { partial } from 'ramda';

export default {
    title: 'Pages/Home',
    decorators: [storyRenderer],
};

const render = partial(home, [CLIENT_CONTEXT]);

export const homePage = () => render(mockData);
