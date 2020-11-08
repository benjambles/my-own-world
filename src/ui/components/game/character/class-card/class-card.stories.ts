import { getClientComponent, storyRenderer } from '../../../../utils/storybook/story-renderer';
import { classCard } from './class-card';
import { ardent } from './__tests__/character-classes.fixture';
import './class-card.css';

const render = getClientComponent(classCard);

export default {
    title: 'Game/Character Creator/Class Card',
    parameters: {
        component: classCard,
        componentSubtitle: 'Class introduction card for the character creation wizard',
    },
    decorators: [storyRenderer],
};

export const base = () => {
    return render({ view: 'large', classDetails: ardent });
};
