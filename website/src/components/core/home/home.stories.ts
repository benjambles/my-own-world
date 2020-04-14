import '../../../static/styles/base.css';
import '../../../static/styles/components/home/home-intro.css';
import { CLIENT_CONTEXT } from '../../../utils/client-context';
import { storyRenderer } from '../../../utils/story-renderer';
import { HomeIntro } from './home-intro';

export default {
    title: 'Pages/Home',
    decorators: [storyRenderer],
};

export function HomeIntroBlock() {
    return HomeIntro(CLIENT_CONTEXT);
}
