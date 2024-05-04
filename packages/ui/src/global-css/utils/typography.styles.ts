import { css } from 'lit';

export const fontSizes = css`
    h1,
    h2,
    h3 {
        margin-block: 15px;
        line-height: 1.3;
        font-family: var(--font-special);
        font-weight: 300;
        text-wrap: balance;
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

    input,
    button,
    textarea,
    select {
        font: inherit;
    }

    .centre {
        text-align: center;
    }

    .bold {
        font-weight: bold;
    }

    p {
        margin-bottom: 15px;
    }

    .underlined {
        text-decoration: underline;
    }

    @media screen and (min-width: 992px) {
        body {
            padding-bottom: 0;
        }

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
    }
`;

export const oxaniumFont = css`
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
`;

export const kungFont = css`
    @font-face {
        font-family: 'Kungfont';
        src:
            local('Kungfont Regular'),
            local('Kungfont-Regular'),
            url('/mow-ui/fonts/kungfont/hinted-Kungfont-Regular.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }
`;
