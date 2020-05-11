import { storyRenderer } from '../../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../../utils/templates/client-context';
import { home } from './home';
import './home-intro/home-intro.css';
import './explore-module.css';
import { mockData } from '../../../../utils/mock-data';

export default {
    title: 'Pages/Home',
    decorators: [storyRenderer],
};

export function homePage() {
    return home(CLIENT_CONTEXT, mockData);
}
