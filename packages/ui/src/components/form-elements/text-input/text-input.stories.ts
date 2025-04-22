import { Meta, StoryFn } from '@storybook/web-components-vite';
import { html } from 'lit';
import { storyRenderer } from '../../../utils/storybook/story-renderer.js';
import { TextInputData, inputStyles, textInput } from './text-input.js';

export default {
    title: 'Atoms/Forms/Text Input',
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

const Template: StoryFn<TextInputData> = (args) => html`${textInput(args)}`;

export const playground = Template.bind({});
playground.args = {
    defaultText: '',
    disabled: false,
    id: 'firstName',
    label: 'First Name',
    name: 'firstName',
    placeholder: 'What should we call you?',
    type: 'text',
};
playground.argTypes = {
    defaultText: { control: { type: 'text', required: false } },
    disabled: { control: { type: 'boolean' } },
    id: { control: { type: 'text', required: true } },
    label: { control: { type: 'text', required: true } },
    name: { control: { type: 'text', required: false } },
    placeholder: { control: { type: 'text', required: false } },
    type: {
        control: { type: 'select' },
        options: [
            'text',
            'email',
            'password',
            'tel',
            'url',
            'search',
            'number',
            'datetime-local',
            'date',
            'time',
            'month',
            'week',
        ],
    },
};

export const types = () => {
    return html`
        ${textInput({
            id: 'ti-text',
            label: 'Basic Text',
            defaultText: 'A string',
        })}
        ${textInput({
            id: 'ti-email',
            label: 'Email',
            type: 'email',
            defaultText: 'someone@mail.com',
        })}
        ${textInput({
            id: 'ti-password',
            label: 'Password',
            type: 'password',
            defaultText: 'secret!',
        })}
        ${textInput({
            id: 'ti-tel',
            label: 'Telephone',
            type: 'tel',
            defaultText: '01474555555',
        })}
        ${textInput({
            id: 'ti-url',
            label: 'URL',
            type: 'url',
            defaultText: 'https://www.google.com',
        })}
        ${textInput({
            id: 'ti-search',
            label: 'Search',
            type: 'search',
            defaultText: 'Whats for dinner?',
        })}
        ${textInput({
            id: 'ti-number',
            label: 'Number',
            type: 'number',
            defaultText: '42',
        })}
        ${textInput({
            id: 'ti-datetime-local',
            label: 'Date Time Local',
            type: 'datetime-local',
            defaultText: '2022-02-18T23:10',
        })}
        ${textInput({
            id: 'ti-date',
            label: 'Date',
            type: 'date',
            defaultText: '2022-02-17',
        })}
        ${textInput({
            id: 'ti-time',
            label: 'Time',
            type: 'time',
            defaultText: '23:13',
        })}
        ${textInput({
            id: 'ti-month',
            label: 'Month',
            type: 'month',
            defaultText: '2022-02',
        })}
        ${textInput({
            id: 'ti-week',
            label: 'Week',
            type: 'week',
            defaultText: '2022-W07',
        })}
    `;
};
