import { Meta, StoryFn } from '@storybook/web-components';
import { getClientComponent, linkStoryRenderer } from '../../../utils/storybook/story-renderer.js';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context.js';
import { ButtonData, destructiveButton } from './destructive-button.js';

export default {
    title: 'Atoms/Buttons/Destructive',
    parameters: {
        componentSubtitle:
            'Destructive buttons are used to denote actions the user can take that are destructive in nature',
    },
    decorators: [linkStoryRenderer],
} as Meta;

const render = getClientComponent(destructiveButton);

export const Template: StoryFn<ButtonData> = (args) => render(args);

const playground = Template.bind({});
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
