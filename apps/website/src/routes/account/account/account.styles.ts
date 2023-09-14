import { barredText, containerMC, gradientText } from '@benjambles/mow-ui/styles.js';
import { CSSResult, css } from 'lit';

export const accountStyles: CSSResult[] = [
    barredText,
    gradientText,
    containerMC,
    css`
        h1 {
            padding: 0 20px;
        }

        .cont-m p {
            padding: 0 20px;
        }

        .cont-m account-form {
            --form-padding: 0 20px;
        }
    `,
];
