import { storyRenderer } from '../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context';
import { homeIntro } from './home-intro';
import './home-intro.css';

export default {
    title: 'Pages/Home',
    decorators: [storyRenderer],
};

export function homeIntroBlock() {
    return homeIntro(CLIENT_CONTEXT);
}
