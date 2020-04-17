import { select, text, withKnobs } from '@storybook/addon-knobs';
import '../../../static/styles/base.css';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context';
import { linkStoryRenderer } from '../../../utils/storybook/story-renderer';
import { DestructiveButton } from './destructive-button';

export default {
    title: 'Atoms/Buttons/Destructive',
    parameters: {
        componentSubtitle:
            'Destructive buttons are used to denote actions the user can take that are destructive in nature',
    },
    decorators: [linkStoryRenderer],
};

export function playground() {
    return DestructiveButton(CLIENT_CONTEXT, {
        text: text('text', 'Button text', 'Required'),
        type: select('type', ['button', 'submit'], undefined, 'Optional'),
        action: text('action', undefined, 'Optional'),
        size: select('size', ['normal', 'large', 'small'], undefined, 'Optional'),
    });
}
playground.story = {
    decorators: [withKnobs],
};

export function buttonSizes() {
    return CLIENT_CONTEXT.html` 
    ${DestructiveButton(CLIENT_CONTEXT, {
        text: 'Small Button',
        size: 'small',
    })}
    ${DestructiveButton(CLIENT_CONTEXT, { text: 'Basic Button' })}
    ${DestructiveButton(CLIENT_CONTEXT, { text: 'Large Button', size: 'large' })}
    `;
}

export function buttonTypes() {
    return CLIENT_CONTEXT.html`
        ${DestructiveButton(CLIENT_CONTEXT, { text: 'Basic Button' })}
        ${DestructiveButton(CLIENT_CONTEXT, { text: 'Submit Button' })}
        ${DestructiveButton(CLIENT_CONTEXT, { text: 'Action Button', action: 'LOGIN.SUBMIT' })}
    `;
}
