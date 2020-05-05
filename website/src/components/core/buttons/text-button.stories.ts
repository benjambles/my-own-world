import { select, text, withKnobs } from '@storybook/addon-knobs';
import { linkStoryRenderer } from '../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context';
import { textButton } from './text-button';

export default {
    title: 'Atoms/Buttons/Text',
    parameters: {
        componentSubtitle:
            "Text buttons are used to denote actions the user can take, but generally won't need to. ",
    },
    decorators: [linkStoryRenderer],
};

export function playground() {
    return textButton(CLIENT_CONTEXT, {
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
    ${textButton(CLIENT_CONTEXT, {
        text: 'Small Button',
        size: 'small',
    })}
    ${textButton(CLIENT_CONTEXT, { text: 'Basic Button' })}
    ${textButton(CLIENT_CONTEXT, { text: 'Large Button', size: 'large' })}
    `;
}

export function buttonTypes() {
    return CLIENT_CONTEXT.html`
        ${textButton(CLIENT_CONTEXT, { text: 'Basic Button' })}
        ${textButton(CLIENT_CONTEXT, { text: 'Submit Button' })}
        ${textButton(CLIENT_CONTEXT, { text: 'Action Button', action: 'LOGIN.SUBMIT' })}
    `;
}
