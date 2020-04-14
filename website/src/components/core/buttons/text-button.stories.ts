import { select, text, withKnobs } from '@storybook/addon-knobs';
import '../../../static/styles/base.css';
import '../../../static/styles/utils/buttons.css';
import { CLIENT_CONTEXT } from '../../../utils/client-context';
import { linkStoryRenderer } from '../../../utils/story-renderer';
import { TextButton } from './text-button';

export default {
    title: 'Atoms/Buttons/Text',
    parameters: {
        componentSubtitle:
            "Text buttons are used to denote actions the user can take, but generally won't need to. ",
    },
    decorators: [linkStoryRenderer],
};

export function playground() {
    return TextButton(CLIENT_CONTEXT, {
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
    ${TextButton(CLIENT_CONTEXT, {
        text: 'Small Button',
        size: 'small',
    })}
    ${TextButton(CLIENT_CONTEXT, { text: 'Basic Button' })}
    ${TextButton(CLIENT_CONTEXT, { text: 'Large Button', size: 'large' })}
    `;
}

export function buttonTypes() {
    return CLIENT_CONTEXT.html`
        ${TextButton(CLIENT_CONTEXT, { text: 'Basic Button' })}
        ${TextButton(CLIENT_CONTEXT, { text: 'Submit Button' })}
        ${TextButton(CLIENT_CONTEXT, { text: 'Action Button', action: 'LOGIN.SUBMIT' })}
    `;
}
