import { getClientComponent, linkStoryRenderer } from '../../../utils/storybook/story-renderer.js';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context.js';
import { outlineButton } from './outline-button.js';

export default {
    title: 'Atoms/Buttons/Outline',
    parameters: {
        component: outlineButton,
        componentSubtitle: 'Outline buttons are used to denote actions the user can take. ',
    },
    decorators: [linkStoryRenderer],
};

const render = getClientComponent(outlineButton);

export const playground = (args) => render(args);
playground.args = {
    action: undefined,
    size: 'normal',
    text: 'Button Text',
    type: 'button',
};
playground.argTypes = {
    action: { control: { type: 'text', required: false } },
    size: { control: { type: 'select' }, options: ['normal', 'large', 'small'] },
    text: { control: { type: 'text', required: true } },
    type: { control: { type: 'select' }, options: ['button', 'submit'] },
};

export const buttonSizes = () => {
    return CLIENT_CONTEXT.html` 
        ${render({
            text: 'Small Button',
            size: 'small',
        })}
        ${render({ text: 'Basic Button' })}
        ${render({
            text: 'Large Button',
            size: 'large',
        })}
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