import { css } from 'lit';

export const rootVars = css`
    :root {
        /* Space hack properties */
        --ON: initial;
        --OFF: ;

        --font-special: 'Oxanium', monospace;
        --font-text: 'Segoe UI', 'Roboto', 'San Fransisco', sans-serif;

        /* Colours */
        --basic-1: #b8e6e8;
        --basic-2: #72e2e6;
        --basic-3: #46e1e7;
        --basic-4: #0fdee5;

        --special-1: #fce4dd;
        --special-2: #f9bbaf;
        --special-3: #f6ab9e;
        --special-4: #f15d5c;

        --shade-0: #fff;
        --shade-1: #e7e7e8;
        --shade-2: #636466;
        --shade-3: #404041;
        --shade-4: #1a1a1a;
        --shade-5: #000;

        --resistance: #afd4f1;

        --gradient-glow: linear-gradient(
            45deg,
            rgba(0, 191, 255, 0.8),
            rgba(255, 0, 255, 0.8)
        );
        --gradient-glow-reverse: linear-gradient(
            200deg,
            rgba(255, 0, 0, 0.8),
            rgba(144, 238, 144, 0.8)
        );
    }
`;
