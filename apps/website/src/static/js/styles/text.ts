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
