import { callOutStyles } from '@benjambles/mow-ui/styles.js';
import { css, CSSResult } from 'lit';
import { twoColGrid } from '../../../../layouts/styles/grid.styles.js';

export const quickStartStyles: CSSResult[] = [
    callOutStyles,
    twoColGrid,
    css`
        .page--quickstart i {
            color: rgba(255 0 0 /80%);
        }

        .callout {
            --co-bg-color: #c7c7c7;
            margin: 30px;
            padding: 20px;
        }

        @media screen and (min-width: 992px) {
            .page--quickstart > section h2 {
                margin-block-start: 4.5rem;
            }

            .page--quickstart > section h3 {
                margin-block-start: 3rem;
            }
        }
    `,
];
