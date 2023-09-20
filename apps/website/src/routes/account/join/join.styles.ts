import { barredText, containerMC, gradientText } from '@benjambles/mow-ui/styles.js';
import { CSSResult, css } from 'lit';

export const joinStyles: CSSResult[] = [
    gradientText,
    barredText,
    containerMC,
    css`
        :root {
            --inline-padding: 20px;
        }

        h1 {
            padding: 0 var(--inline-padding);
        }

        .cont-m login-form {
            margin-bottom: 60px;
            --form-padding: 0 var(--inline-padding);
        }

        .cont-m join-form {
            --form-padding: 0 var(--inline-padding);
        }

        .barred {
            font-variant: small-caps;
        }
    `,
];
