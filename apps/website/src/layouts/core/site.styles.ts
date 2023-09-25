import { css } from 'lit';

export default css`
    * {
        box-sizing: border-box;
    }

    :root {
        /* Space hack properties */
        --ON: initial;
        --OFF: ;

        --font-special: 'Oxanium', monospace;
        --font-text: 'Segoe UI', 'Roboto', 'San Fransisco', sans-serif;

        /* Colours */
        --basic-1: #b8e6e8;
        --basic-2: #72e2e6;
        --basic-3: #46e1e7;
        --basic-4: #0fdee5;

        --special-1: #fce4dd;
        --special-2: #f9bbaf;
        --special-3: #f6ab9e;
        --special-4: #f15d5c;

        --shade-0: #fff;
        --shade-1: #e7e7e8;
        --shade-2: #636466;
        --shade-3: #404041;
        --shade-4: #1a1a1a;
        --shade-5: #000;

        --resistance: #afd4f1;

        --gradient-glow: linear-gradient(
            45deg,
            rgba(0, 191, 255, 0.8),
            rgba(255, 0, 255, 0.8)
        );
        --gradient-glow-reverse: linear-gradient(
            200deg,
            rgba(255, 0, 0, 0.8),
            rgba(144, 238, 144, 0.8)
        );
    }

    @font-face {
        font-family: 'Oxanium';
        src:
            local('Oxanium Medium'),
            local('Oxanium-Medium'),
            url('/mow-ui/fonts/oxanium/Oxanium-Medium.woff2') format('woff2');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: 'Oxanium';
        src:
            local('Oxanium Light'),
            local('Oxanium-Light'),
            url('/mow-ui/fonts/oxanium/Oxanium-Light.woff2') format('woff2');
        font-weight: 300;
        font-style: normal;
        font-display: swap;
    }

    html {
        font-family: var(--font-text);
        font-size: 62.5%;
        line-height: 1.5;
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
    }

    ::-webkit-scrollbar {
        width: 1em;
    }

    ::-webkit-scrollbar-track {
        background: linear-gradient(180deg, rgb(193 239 255), rgb(255 196 255));
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    ::-webkit-scrollbar-thumb {
        background: rgb(51 51 51 / 80%);
    }

    *:hover,
    *:active,
    *:focus {
        outline: none;
    }

    a {
        color: var(--special-4);
        text-decoration: none;
        transition: color 0.1s;
    }

    a:hover,
    a:focus {
        color: var(--basic-4);
    }

    h1,
    h2,
    h3 {
        margin-block: 15px;
        line-height: 1.3;
        font-family: var(--font-special);
        font-weight: 300;
    }

    h1 {
        font-size: 3rem;
    }

    h2 {
        font-size: 2.6rem;
    }

    h3 {
        font-size: 2.4rem;
    }

    h4 {
        margin-block: 15px;
        font-size: 2rem;
    }

    h5 {
        font-size: 1.8rem;
    }

    p {
        margin-block: 15px;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    [class^='page--'],
    [class*=' page--'] {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    @media screen and (min-width: 992px) {
        h1 {
            font-size: 7rem;
        }

        h2 {
            font-size: 4.6rem;
        }

        h3 {
            font-size: 3.4rem;
        }

        h4 {
            font-size: 2.8rem;
        }

        h5 {
            font-size: 2rem;
        }

        .content-wrapper {
            margin-left: 100px;
        }
    }
`;
