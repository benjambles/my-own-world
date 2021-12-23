import { html } from 'lit';
import { linkStoryRenderer } from '../../../utils/storybook/story-renderer.js';
import { outlineButton } from './outline-button.js';

export default {
    title: 'Atoms/Buttons/Outline',
    parameters: {
        component: outlineButton,
        componentSubtitle: 'Outline buttons are used to denote actions the user can take. ',
    },
    decorators: [linkStoryRenderer],
};

export const playground = (args) => outlineButton(args);
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
        ${outlineButton({
            text: 'Small Button',
            size: 'small',
        })}
        ${outlineButton({ text: 'Basic Button' })}
        ${outlineButton({
            text: 'Large Button',
            size: 'large',
        })}
    `;
};

export const buttonTypes = () => {
    return html`
        ${outlineButton({ text: 'Basic Button' })} ${outlineButton({ text: 'Submit Button' })}
        ${outlineButton({
            text: 'Action Button',
            action: 'LOGIN.SUBMIT',
        })}
    `;
};
