import { select, text, withKnobs } from '@storybook/addon-knobs';
import { linkStoryRenderer } from '../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context';
import { outlineButton } from './outline-button';

export default {
    title: 'Atoms/Buttons/Outline',
    parameters: {
        component: outlineButton,
        componentSubtitle: 'Outline buttons are used to denote actions the user can take. ',
    },
    decorators: [linkStoryRenderer],
};

export function playground() {
    return outlineButton(CLIENT_CONTEXT, {
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
        ${outlineButton(CLIENT_CONTEXT, {
            text: 'Small Button',
            size: 'small',
        })}
        ${outlineButton(CLIENT_CONTEXT, { text: 'Basic Button' })}
        ${outlineButton(CLIENT_CONTEXT, { text: 'Large Button', size: 'large' })}
    `;
}

export function buttonTypes() {
    return CLIENT_CONTEXT.html`
        ${outlineButton(CLIENT_CONTEXT, { text: 'Basic Button' })}
        ${outlineButton(CLIENT_CONTEXT, { text: 'Submit Button' })}
        ${outlineButton(CLIENT_CONTEXT, { text: 'Action Button', action: 'LOGIN.SUBMIT' })}
    `;
}
