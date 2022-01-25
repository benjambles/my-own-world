import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit';
import { linkStoryRenderer } from '../../../utils/storybook/story-renderer.js';
import { ButtonData, destructiveButton } from './destructive-button.js';

export default {
    title: 'Atoms/Buttons/Destructive',
    parameters: {
        componentSubtitle:
            'Destructive buttons are used to denote actions the user can take that are destructive in nature',
    },
    decorators: [linkStoryRenderer],
} as Meta;

const Template: StoryFn<ButtonData> = (args) => destructiveButton(args);

export const playground = Template.bind({});
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
    return html`
        ${destructiveButton({
            text: 'Small Button',
            size: 'small',
        })}
        ${destructiveButton({ text: 'Basic Button' })}
        ${destructiveButton({
            text: 'Large Button',
            size: 'large',
        })}
    `;
};

export const buttonTypes = () => {
    return html`
        ${destructiveButton({ text: 'Basic Button' })}
        ${destructiveButton({ text: 'Submit Button' })}
        ${destructiveButton({
            text: 'Action Button',
            action: 'LOGIN.SUBMIT',
        })}
    `;
};
