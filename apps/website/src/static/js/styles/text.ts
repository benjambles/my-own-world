import { css } from 'lit';

export const speechBubbleStyles = css`
    .speech {
        --bg-color: #cacaca;
        margin: 20px 0;
        padding: 20px 20px 20px 40px;
        position: relative;
        background-image: linear-gradient(45deg, transparent 10px, var(--bg-color) 10px),
            linear-gradient(135deg, var(--bg-color) 0, var(--bg-color) 0),
            linear-gradient(225deg, transparent 10px, var(--bg-color) 10px),
            linear-gradient(315deg, var(--bg-color) 0, var(--bg-color) 0px);
        background-position:
            bottom left,
            bottom right,
            top right,
            top left;
        background-size: 51% 51%;
        background-repeat: no-repeat;
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
