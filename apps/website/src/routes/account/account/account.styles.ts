import { containerMC, gradientText } from '@benjambles/mow-ui/styles.js';
import { CSSResult, css } from 'lit';

export const accountStyles: CSSResult[] = [
    gradientText,
    containerMC,
    css`
        :root {
            --inline-padding: 20px;
        }

        h1 {
            padding-inline: var(--inline-padding);
        }

        .cont-m p {
            padding-inline: var(--inline-padding);
        }

        .cont-m account-form {
            --form-padding: 0 var(--inline-padding);
        }
    `,
];
