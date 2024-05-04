import { CSSResult, css } from 'lit';

export const twoColGrid: CSSResult = css`
    .two-col-grid {
        display: flex;
        flex-direction: column-reverse;
        margin: 60px;
    }

    @media screen and (min-width: 992px) {
        .two-col-grid {
            display: grid;
            grid-template-columns: repeat(12, [col-start] 1fr);
            grid-gap: 20px;
        }

        .two-col-grid > :nth-child(1) {
            grid-column: col-start 1 / span 7;
            grid-row: 1;
            font-size: 1.8rem;
        }

        .two-col-grid > :nth-child(2) {
            grid-column: col-start 8 / span 3;
            align-self: start;
        }
    }
`;
