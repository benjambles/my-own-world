import { css } from 'lit';

export const callOutStyles = css`
    .callout {
        --_bg-color: var(--co-bg-color, #e7e7e8);
        --_slice: var(--co-slice-size, 10px);
        background-color: transparent;
        background-image: linear-gradient(
                45deg,
                transparent var(--_slice),
                var(--_bg-color) var(--_slice)
            ),
            linear-gradient(135deg, var(--_bg-color) 0px, var(--_bg-color) 0px),
            linear-gradient(
                225deg,
                transparent var(--_slice),
                var(--_bg-color) var(--_slice)
            ),
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
