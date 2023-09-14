import { callOutStyles } from '@benjambles/mow-ui/styles.js';
import { css, CSSResult } from 'lit';

export const quickStartStyles: CSSResult[] = [
    callOutStyles,
    css`
        .page--quickstart {
            display: flex;
            flex-direction: column-reverse;
            margin: 60px;
        }

        .page--quickstart i {
            color: rgba(255 0 0 /80%);
        }

        .page--quickstart nav ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .callout {
            --co-bg-color: #c7c7c7;
            margin: 30px;
            padding: 20px;
        }

        @media screen and (min-width: 992px) {
            .page--quickstart {
                display: grid;
                grid-template-columns: repeat(12, [col-start] 1fr);
                grid-gap: 20px;
            }

            .page--quickstart > section {
                grid-column: col-start 1 / span 7;
                grid-row: 1;
                display: flex;
                justify-content: center;
                flex-direction: column;
                font-size: 1.8rem;
            }

            .page--quickstart > nav {
                grid-column: col-start 8 / span 3;
                align-self: start;
                border-left: 1px solid #333;
                padding: 20px;
                margin-left: 20px;
                position: sticky;
                top: 20px;
            }
        }
    `,
];
