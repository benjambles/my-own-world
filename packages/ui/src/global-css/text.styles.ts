import { css } from 'lit';

export const speechBubbleStyles = css`
    .speech {
        --co-bg-color: #cacaca;
        margin: 20px 0;
        padding: 20px 20px 20px 40px;
        position: relative;
        font-style: italic;
    }

    .speech::before {
        content: '▶';
        position: absolute;
        left: 20px;
        top: 22px;
        font-size: 14px;
        font-style: normal;
    }

    .speech p {
        margin-block-start: 0;
    }

    .speech p:last-child {
        margin-block-end: 0;
    }
`;

export const barredText = css`
    .barred {
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: 20px;
        margin: 6rem auto;
        font-variant: small-caps;
        font-size: 2rem;
        text-align: center;
    }

    .barred::after,
    .barred::before {
        flex: 1;
        border-bottom: 1px solid #333;
        content: ' ';
    }
`;

export const gradientText = css`
    .gradient-text {
        background-image: var(--gradient-glow);
        background-clip: text;
        color: transparent;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;
