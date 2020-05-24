import { select, text, withKnobs } from '@storybook/addon-knobs';
import { linkStoryRenderer } from '../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context';
import { destructiveButton } from './destructive-button';

export default {
    title: 'Atoms/Buttons/Destructive',
    parameters: {
        componentSubtitle:
            'Destructive buttons are used to denote actions the user can take that are destructive in nature',
    },
    decorators: [linkStoryRenderer],
};

export const playground = () =>
    destructiveButton(CLIENT_CONTEXT, {
        text: text('text', 'Button text', 'Required'),
        type: select('type', ['button', 'submit'], undefined, 'Optional'),
        action: text('action', undefined, 'Optional'),
        size: select('size', ['normal', 'large', 'small'], undefined, 'Optional'),
    });

playground.story = {
    decorators: [withKnobs],
};

export const buttonSizes = () =>
    CLIENT_CONTEXT.html` 
        ${destructiveButton(CLIENT_CONTEXT, {
            text: 'Small Button',
            size: 'small',
        })}
        ${destructiveButton(CLIENT_CONTEXT, { text: 'Basic Button' })}
        ${destructiveButton(CLIENT_CONTEXT, {
            text: 'Large Button',
            size: 'large',
        })}
    `;

export const buttonTypes = () =>
    CLIENT_CONTEXT.html`
        ${destructiveButton(CLIENT_CONTEXT, { text: 'Basic Button' })}
        ${destructiveButton(CLIENT_CONTEXT, { text: 'Submit Button' })}
        ${destructiveButton(CLIENT_CONTEXT, {
            text: 'Action Button',
            action: 'LOGIN.SUBMIT',
        })}
    `;
