import { addDecorator } from '@storybook/html';
import { withA11y } from '@storybook/addon-a11y';

import '../../../dist/ui/static/styles/global-css/base.css';

addDecorator(withA11y);

export const parameters = {
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
};
