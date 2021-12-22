import { addDecorator } from '@storybook/web-components';
import { withA11y } from '@storybook/addon-a11y';

import '../lib/static/styles/global-css/base.css';

addDecorator(withA11y);

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
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
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
