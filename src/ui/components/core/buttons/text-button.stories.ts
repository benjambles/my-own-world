import { select, text, withKnobs } from '@storybook/addon-knobs';
import { linkStoryRenderer } from '../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context';
import { textButton } from './text-button';
import { partial } from 'ramda';

export default {
    title: 'Atoms/Buttons/Text',
    parameters: {
        componentSubtitle:
            "Text buttons are used to denote actions the user can take, but generally won't need to. ",
    },
    decorators: [linkStoryRenderer],
};

const render = partial(textButton, [CLIENT_CONTEXT]);

export const playground = () => {
    return render({
        text: text('text', 'Button text', 'Required'),
        type: select('type', ['button', 'submit'], undefined, 'Optional'),
        action: text('action', undefined, 'Optional'),
        size: select('size', ['normal', 'large', 'small'], undefined, 'Optional'),
    });
};
playground.decorators = [withKnobs];

export const buttonSizes = () => {
    return CLIENT_CONTEXT.html` 
    ${render({
        text: 'Small Button',
        size: 'small',
    })}
    ${render({ text: 'Basic Button' })}
    ${render({ text: 'Large Button', size: 'large' })}
    `;
};

export const buttonTypes = () => {
    return CLIENT_CONTEXT.html`
        ${render({ text: 'Basic Button' })}
        ${render({ text: 'Submit Button' })}
        ${render({
            text: 'Action Button',
            action: 'LOGIN.SUBMIT',
        })}
    `;
};
