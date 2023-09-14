import { css } from 'lit';

export const callOutStyles = css`
    .callout {
        --_bg-color: var(--co-bg-color, #e7e7e8);
        background-color: transparent;
        background-image: linear-gradient(45deg, transparent 10px, var(--_bg-color) 10px),
            linear-gradient(135deg, var(--_bg-color) 0px, var(--_bg-color) 0px),
            linear-gradient(225deg, transparent 10px, var(--_bg-color) 10px),
            linear-gradient(315deg, var(--_bg-color) 0px, var(--_bg-color) 0px);
        background-position:
            left bottom,
            right bottom,
            right top,
            left top;
        background-repeat: no-repeat;
        background-size: 51% 51%;
    }
`;
