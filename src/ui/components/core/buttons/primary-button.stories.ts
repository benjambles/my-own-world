import { select, text, withKnobs } from '@storybook/addon-knobs';
import { getClientComponent, linkStoryRenderer } from '../../../utils/storybook/story-renderer.js';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context.js';
import { primaryButton } from './primary-button.js';

export default {
    title: 'Atoms/Buttons/Primary',
    parameters: {
        componentSubtitle: 'Primary buttons are used to denote postive actions the user can take. ',
    },
    decorators: [linkStoryRenderer],
};

const render = getClientComponent(primaryButton);

export const playground = () => {
    return render({
        text: text('text', 'Button text', 'Required'),
        type: select('type', ['button', 'submit'], undefined, 'Optional'),
        action: text('action', undefined, 'Optional'),
        size: select('size', ['normal', 'large', 'small'], undefined, 'Optional'),
    });
};
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
