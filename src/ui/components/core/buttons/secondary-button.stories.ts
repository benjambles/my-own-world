import { select, text, withKnobs } from '@storybook/addon-knobs';
import { getClientComponent, linkStoryRenderer } from '../../../utils/storybook/story-renderer.js';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context.js';
import { secondaryButton } from './secondary-button.js';

export default {
    title: 'Atoms/Buttons/Secondary',
    parameters: {
        componentSubtitle: 'Secondary buttons are used to denote actions the user can take. ',
    },
    decorators: [linkStoryRenderer],
};

const render = getClientComponent(secondaryButton);

export const playground = () =>
    render({
        text: text('text', 'Button text', 'Required'),
        type: select('type', ['button', 'submit'], undefined, 'Optional'),
        action: text('action', undefined, 'Optional'),
        size: select('size', ['normal', 'large', 'small'], undefined, 'Optional'),
    });

playground.decorators = [withKnobs];

export const buttonSizes = () => {
    return CLIENT_CONTEXT.html` 
        ${render({
            text: 'Small Button',
            size: 'small',
        })}
        ${render({ text: 'Basic Button' })}
        ${render({ text: 'Large Button', size: 'large' })}
    `;
};

export const buttonTypes = () => {
    return CLIENT_CONTEXT.html`
        ${render({ text: 'Basic Button' })}
        ${render({ text: 'Submit Button' })}
        ${render({
            text: 'Action Button',
            action: 'LOGIN.SUBMIT',
        })}
    `;
};
