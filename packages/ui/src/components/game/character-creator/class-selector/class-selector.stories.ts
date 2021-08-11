import { getClientComponent, storyRenderer } from '../../../../utils/storybook/story-renderer.js';
import { classSelector } from './class-selector.js';
import { ardent } from '../../character/class-card/__tests__/character-classes.fixture.js';
import './class-selector.css';

const render = getClientComponent(classSelector);

export default {
    title: 'Game/Character Creation/Class Selector',
    parameters: {
        component: classSelector,
        componentSubtitle:
            'Allows a player to see the available classes and chose who they wish to be',
    },
    decorators: [storyRenderer],
};

export const base = () => {
    return render({
        title: 'Choose your profession',
        characterClasses: [ardent, ardent, ardent, ardent, ardent],
    });
};
