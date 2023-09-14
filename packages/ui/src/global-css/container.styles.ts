import { css } from 'lit';

export const containerMC = css`
    .cont-m {
        display: block;
        max-width: 300px;
        margin: 0 auto;
        padding: 60px 0;
    }

    @media screen and (min-width: 992px) {
        .cont-m {
            max-width: 720px;
        }
    }
`;

export const flexColToRow = css`
    .col-to-row {
        --_gap: var(--col-to-row-gap, 30px);
        display: flex;
        flex-direction: column;
        gap: var(--_gap);
    }

    @media screen and (min-width: 992px) {
        .col-to-row {
            flex-direction: row;
        }
    }
`;
