import {
    callOutStyles,
    flexColToRow,
    gradientText,
    outlineButton,
} from '@benjambles/mow-ui/styles.js';
import { CSSResult, css } from 'lit';

export const homeStyles: CSSResult[] = [
    gradientText,
    flexColToRow,
    callOutStyles,
    outlineButton,
    css`
        h1 {
            margin: 0;
            position: relative;
            font-size: 10rem;
        }

        .panel {
            padding: 0 6rem;
        }

        .home-intro {
            flex: 1 1 100%;
            display: flex;
            flex-direction: column;
            justify-content: end;
            min-height: 100vh;
            padding: 6rem 0 3rem;
            position: relative;
            color: var(--shade-4);
            text-align: center;
            text-transform: uppercase;
        }

        .home-intro p {
            margin-block: 0 8rem;
            position: relative;
            top: -2rem;
            font-size: 1.6rem;
            letter-spacing: 0.1em;
        }

        .home-intro p:not(:first-of-type) {
            margin-block-end: 0;
            font-size: 2rem;
            letter-spacing: 0.2em;
        }

        .home-welcome h2 {
            margin: 6rem 0 10rem;
            font-size: 6rem;
            letter-spacing: 0.02em;
            line-height: 1.1;
            text-align: center;
        }

        .welcome-text {
            margin: 0 0 8rem;
        }

        .explorer-panel {
            margin-bottom: 12rem;
        }

        .explorer-panel h2 {
            margin: 12rem 0 8rem;
            font-size: 6rem;
        }

        .explorer-links {
            margin-block: 8rem;
            padding: 0;
            list-style: none;
        }

        .explorer-links li {
            flex: 1 1 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 450px;
            font-size: 2rem;
            letter-spacing: 0.1em;
            text-align: center;
            text-transform: uppercase;
        }

        .explorer-links li a {
            --co-bg-color: #ccc;
            flex: 1 1 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 30px 20px;
        }

        .explorer-links li a:hover,
        .explorer-links li a:focus {
            --co-bg-color: #777;
            color: white;
        }

        @media screen and (min-width: 992px) {
            h1 {
                font-size: 12rem;
            }

            .welcome-text {
                padding-left: 60%;
            }

            .home-welcome h2 {
                font-size: 18rem;
            }
        }
    `,
];
