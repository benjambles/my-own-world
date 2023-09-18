import { css } from 'lit';

export const speechBubbleStyles = css`
    .speech {
        --co-bg-color: #cacaca;
        --_margin: var(--speech-margin, 20px 0);
        margin: var(--_margin);
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
        --_font-size: var(--barred-font-size, 2rem);
        --_border: var(--barred-border, 1px solid #333);
        --_gap: var(--barred-gap, 20px);
        --_margin: var(--barred-margin-block, 60px);
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: var(--_gap);
        margin: var(--_margin) auto;
        font-size: var(--_font-size);
        text-align: center;
    }

    .barred::after,
    .barred::before {
        flex: 1;
        border-bottom: var(--_border);
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
