import { callOutStyles, flexColToRow } from '@benjambles/mow-ui/styles.js';
import { CSSResult, css } from 'lit';

export const toolsStyles: CSSResult[] = [
    flexColToRow,
    callOutStyles,
    css`
        h1 {
            margin: 6rem 0;
            position: relative;
            font-size: 10rem;
        }

        .panel {
            padding: 0 6rem;
        }

        .tool-links {
            margin-block: 8rem;
            padding: 0;
            list-style: none;
        }

        .tool-links li {
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

        .tool-links li a {
            --co-bg-color: #ccc;
            flex: 1 1 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 30px 20px;
        }

        .tool-links li a:is(:hover, :focus) {
            --co-bg-color: #777;
            color: white;
        }
    `,
];
