import { mockData } from '../../../../utils/mock-data';
import { getClientComponent, storyRenderer } from '../../../../utils/storybook/story-renderer';
import { home } from './home';
import './home-intro/home-intro.css';

export default {
    title: 'Pages/Home',
    decorators: [storyRenderer],
};

const render = getClientComponent(home);

export const homePage = () => render(mockData);
