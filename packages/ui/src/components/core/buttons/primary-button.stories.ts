import { html } from 'lit';
import { linkStoryRenderer } from '../../../utils/storybook/story-renderer.js';
import { primaryButton } from './primary-button.js';

export default {
    title: 'Atoms/Buttons/Primary',
    parameters: {
        componentSubtitle: 'Primary buttons are used to denote postive actions the user can take. ',
    },
    decorators: [linkStoryRenderer],
};

export const playground = (args) => primaryButton(args);
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
        ${primaryButton({
            text: 'Small Button',
            size: 'small',
        })}
        ${primaryButton({ text: 'Basic Button' })}
        ${primaryButton({ text: 'Large Button', size: 'large' })}
    `;
};

export const buttonTypes = () => {
    return html`
        ${primaryButton({ text: 'Basic Button' })} ${primaryButton({ text: 'Submit Button' })}
        ${primaryButton({
            text: 'Action Button',
            action: 'LOGIN.SUBMIT',
        })}
    `;
};
