import { addDecorator } from '@storybook/html';
import { withA11y } from '@storybook/addon-a11y';

import '../../dist/website/static/styles/global-css/base.css';

addDecorator(withA11y);
