import { Meta, StoryFn } from '@storybook/web-components-vite';
import { html } from 'lit';
import { storyRenderer } from '../../../utils/storybook/story-renderer.js';
import { textArea, TextAreaData } from './text-area.js';
import { inputStyles } from '../text-input/text-input.js';

export default {
    title: 'Atoms/Forms/Textarea',
    decorators: [
        (story) =>
            html`<form style="max-width:500px;">
                <style>
                    ${inputStyles.cssText}
                </style>
                ${story()}
            </form>`,
        storyRenderer,
    ],
} as Meta;

const Template: StoryFn<TextAreaData> = (args) => html`${textArea(args)}`;

export const playground = Template.bind({});
playground.args = {
    defaultText: '',
    disabled: false,
    id: 'firstName',
    label: 'First Name',
    maxLength: undefined,
    minLength: undefined,
    name: 'firstName',
    placeholder: 'What should we call you?',
};
playground.argTypes = {
    defaultText: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    id: { control: { type: 'text', required: true } },
    label: { control: { type: 'text', required: true } },
    maxLength: { control: { type: 'number' } },
    minLength: { control: { type: 'number' } },
    name: { control: { type: 'text' } },
    placeholder: { control: { type: 'text' } },
};
