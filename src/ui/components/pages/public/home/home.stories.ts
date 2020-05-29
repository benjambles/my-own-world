import { storyRenderer } from '../../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../../utils/templates/client-context';
import { home } from './home';
import './home-intro/home-intro.css';
import { mockData } from '../../../../utils/mock-data';

export default {
    title: 'Pages/Home',
    decorators: [storyRenderer],
};

export const homePage = () => {
    return home(CLIENT_CONTEXT, mockData);
};
