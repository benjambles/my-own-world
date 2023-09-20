import { css } from 'lit';

export const outlineButton = css`
    .outline-button {
        flex: 1 1 100%;
        display: block;
        border: 1px solid var(--shade-3);
        border-width: 1px 0;
        padding: 2rem;
        background-color: transparent;
        color: var(--shade-3);
        font-size: 2rem;
        letter-spacing: 0.2em;
        text-align: center;
        text-transform: uppercase;
    }

    .outline-button:is(:hover, :active, :focus) {
        background: var(--gradient-glow);
        border-color: transparent;
        border-image: var(--gradient-glow);
        color: var(--shade-0);
        text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.8);
    }

    .outline-button-small {
        padding: 1rem 2rem;
    }
`;
