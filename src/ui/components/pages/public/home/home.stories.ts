import { mockData } from '../../../../utils/mock-data.js';
import { getClientComponent, storyRenderer } from '../../../../utils/storybook/story-renderer.js';
import './home-intro/home-intro.css';
import { home } from './home.js';

export default {
    title: 'Pages/Home',
    decorators: [storyRenderer],
};

const render = getClientComponent(home);

export function homePage() {
    return render(mockData);
}
