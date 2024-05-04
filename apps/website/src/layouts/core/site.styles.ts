import {
    fontSizes,
    oxaniumFont,
    resetStyles,
    rootVars,
} from '@benjambles/mow-ui/styles.js';
import { css } from 'lit';

export default [
    rootVars,
    oxaniumFont,
    resetStyles,
    css`
        ::-webkit-scrollbar {
            width: 1em;
        }

        ::-webkit-scrollbar-track {
            background: linear-gradient(180deg, rgb(193 239 255), rgb(255 196 255));
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        }

        ::-webkit-scrollbar-thumb {
            background: rgb(51 51 51 / 80%);
        }

        .content-wrapper {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        #content {
            flex: 1 1 auto;
        }

        @media screen and (min-width: 992px) {
            .content-wrapper {
                margin-left: 100px;
            }
        }
    `,
    fontSizes,
];
