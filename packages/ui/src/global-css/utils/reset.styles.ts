import { css } from 'lit';

export const resetStyles = css`
    * {
        box-sizing: border-box;
    }

    html {
        font-family: var(--font-text);
        font-size: 62.5%;
        line-height: 1.5;
        -moz-text-size-adjust: none;
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
    }

    html,
    body {
        margin: 0;
        padding: 0;
        max-width: 100%;
        background: var(--shade-1);
        color: var(--shade-4);
    }

    body {
        font-size: 1.6rem;
        padding-bottom: 60px;
    }

    *:hover,
    *:active,
    *:focus {
        outline: none;
    }

    :target {
        scroll-margin-block: 5ex;
    }

    a {
        color: var(--special-4);
        text-decoration: none;
        text-decoration-skip-ink: auto;
        transition: color 0.1s;
    }

    a:is(:hover, :focus) {
        color: var(--basic-4);
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    @media screen and (min-width: 992px) {
        body {
            padding-bottom: 0;
        }
    }
`;
