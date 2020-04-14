import { select, text, withKnobs } from '@storybook/addon-knobs';
import '../../../static/styles/base.css';
import '../../../static/styles/utils/buttons.css';
import { CLIENT_CONTEXT } from '../../../utils/client-context';
import { linkStoryRenderer } from '../../../utils/story-renderer';
import { PrimaryButton } from './primary-button';

export default {
    title: 'Atoms/Buttons/Primary',
    parameters: {
        componentSubtitle: 'Primary buttons are used to denote postive actions the user can take. ',
    },
    decorators: [linkStoryRenderer],
};

export function playground() {
    return PrimaryButton(CLIENT_CONTEXT, {
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
    ${PrimaryButton(CLIENT_CONTEXT, {
        text: 'Small Button',
        size: 'small',
    })}
    ${PrimaryButton(CLIENT_CONTEXT, { text: 'Basic Button' })}
    ${PrimaryButton(CLIENT_CONTEXT, { text: 'Large Button', size: 'large' })}
    `;
}

export function buttonTypes() {
    return CLIENT_CONTEXT.html`
        ${PrimaryButton(CLIENT_CONTEXT, { text: 'Basic Button' })}
        ${PrimaryButton(CLIENT_CONTEXT, { text: 'Submit Button' })}
        ${PrimaryButton(CLIENT_CONTEXT, { text: 'Action Button', action: 'LOGIN.SUBMIT' })}
    `;
}
