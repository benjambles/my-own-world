import { select, text, withKnobs } from '@storybook/addon-knobs';
import '../../../static/styles/base.css';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context';
import { linkStoryRenderer } from '../../../utils/storybook/story-renderer';
import { SecondaryButton } from './secondary-button';

export default {
    title: 'Atoms/Buttons/Secondary',
    parameters: {
        componentSubtitle: 'Secondary buttons are used to denote actions the user can take. ',
    },
    decorators: [linkStoryRenderer],
};

export function playground() {
    return SecondaryButton(CLIENT_CONTEXT, {
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
    ${SecondaryButton(CLIENT_CONTEXT, {
        text: 'Small Button',
        size: 'small',
    })}
    ${SecondaryButton(CLIENT_CONTEXT, { text: 'Basic Button' })}
    ${SecondaryButton(CLIENT_CONTEXT, { text: 'Large Button', size: 'large' })}
    `;
}

export function buttonTypes() {
    return CLIENT_CONTEXT.html`
        ${SecondaryButton(CLIENT_CONTEXT, { text: 'Basic Button' })}
        ${SecondaryButton(CLIENT_CONTEXT, { text: 'Submit Button' })}
        ${SecondaryButton(CLIENT_CONTEXT, { text: 'Action Button', action: 'LOGIN.SUBMIT' })}
    `;
}
