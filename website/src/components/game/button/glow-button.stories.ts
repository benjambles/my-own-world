import { linkStoryRendererDark } from '../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context';
import { glowButton } from './glow-button';
import './glow-button.css';

export default {
    title: 'Atoms/Buttons/Glow Button',
    parameters: {
        component: glowButton,
        componentSubtitle: 'Glowy button',
    },
    decorators: [linkStoryRendererDark],
};

export const base = () => {
    return glowButton(CLIENT_CONTEXT, { text: 'Test Button' });
};
