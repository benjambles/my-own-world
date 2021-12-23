import { mockData } from '../../../../utils/mock-data.js';
import { storyRenderer } from '../../../../utils/storybook/story-renderer.js';
import './home-intro/home-intro.css';
import { home } from './home.js';

export default {
    title: 'Pages/Home',
    decorators: [storyRenderer],
};

export function homePage() {
    return home(mockData);
}
