import { html } from 'lit';
import { linkStoryRenderer } from '../../../utils/storybook/story-renderer.js';
import { secondaryButton } from './secondary-button.js';

export default {
    title: 'Atoms/Buttons/Secondary',
    parameters: {
        componentSubtitle: 'Secondary buttons are used to denote actions the user can take. ',
    },
    decorators: [linkStoryRenderer],
};

export const playground = (args) => secondaryButton(args);
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
        ${secondaryButton({
            text: 'Small Button',
            size: 'small',
        })}
        ${secondaryButton({ text: 'Basic Button' })}
        ${secondaryButton({ text: 'Large Button', size: 'large' })}
    `;
};

export const buttonTypes = () => {
    return html`
        ${secondaryButton({ text: 'Basic Button' })} ${secondaryButton({ text: 'Submit Button' })}
        ${secondaryButton({
            text: 'Action Button',
            action: 'LOGIN.SUBMIT',
        })}
    `;
};
