import '../../../static/styles/base.css';
import '../../../static/styles/components/home/home-intro.css';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context';
import { storyRenderer } from '../../../utils/storybook/story-renderer';
import { homeIntro } from './home-intro';

export default {
    title: 'Pages/Home',
    decorators: [storyRenderer],
};

export function homeIntroBlock() {
    return homeIntro(CLIENT_CONTEXT);
}
