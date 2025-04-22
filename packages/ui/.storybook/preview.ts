import 'lit';

import './base.css';
import type { Preview } from '@storybook/web-components-vite';

const preview: Preview = {
    parameters: {
        backgrounds: {
            default: 'light',
            values: [
                {
                    name: 'light',
                    value: '#fff',
                },
                {
                    name: 'dark',
                    value: '#234',
                },
            ],
        },
        controls: {
            expanded: true,
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        docs: {
            source: {
                codePanel: true,
            },
        },
        options: {
            storySort: {
                order: ['Atoms', 'Components', ['Navigation', 'Game'], 'Furniture'],
            },
        },
    },
    tags: ['autodocs'],
};

export default preview;
