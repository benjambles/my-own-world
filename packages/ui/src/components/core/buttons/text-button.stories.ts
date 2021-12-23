import { html } from 'lit';
import { linkStoryRenderer } from '../../../utils/storybook/story-renderer.js';
import { textButton } from './text-button.js';

export default {
    title: 'Atoms/Buttons/Text',
    parameters: {
        componentSubtitle:
            "Text buttons are used to denote actions the user can take, but generally won't need to. ",
    },
    decorators: [linkStoryRenderer],
};

export const playground = (args) => textButton(args);
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
        ${textButton({
            text: 'Small Button',
            size: 'small',
        })}
        ${textButton({ text: 'Basic Button' })}
        ${textButton({ text: 'Large Button', size: 'large' })}
    `;
};

export const buttonTypes = () => {
    return html`
        ${textButton({ text: 'Basic Button' })} ${textButton({ text: 'Submit Button' })}
        ${textButton({
            text: 'Action Button',
            action: 'LOGIN.SUBMIT',
        })}
    `;
};
