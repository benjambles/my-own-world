import { select, text, withKnobs } from '@storybook/addon-knobs';
import { linkStoryRenderer } from '../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context';
import { primaryButton } from './primary-button';

export default {
    title: 'Atoms/Buttons/Primary',
    parameters: {
        componentSubtitle: 'Primary buttons are used to denote postive actions the user can take. ',
    },
    decorators: [linkStoryRenderer],
};

export function playground() {
    return primaryButton(CLIENT_CONTEXT, {
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
    ${primaryButton(CLIENT_CONTEXT, {
        text: 'Small Button',
        size: 'small',
    })}
    ${primaryButton(CLIENT_CONTEXT, { text: 'Basic Button' })}
    ${primaryButton(CLIENT_CONTEXT, { text: 'Large Button', size: 'large' })}
    `;
}

export function buttonTypes() {
    return CLIENT_CONTEXT.html`
        ${primaryButton(CLIENT_CONTEXT, { text: 'Basic Button' })}
        ${primaryButton(CLIENT_CONTEXT, { text: 'Submit Button' })}
        ${primaryButton(CLIENT_CONTEXT, { text: 'Action Button', action: 'LOGIN.SUBMIT' })}
    `;
}
