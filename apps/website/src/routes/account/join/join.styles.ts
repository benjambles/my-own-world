import { containerMC, gradientText } from '@benjambles/mow-ui/styles.js';
import { CSSResult, css } from 'lit';

export const joinStyles: CSSResult[] = [
    gradientText,
    containerMC,
    css`
        h1 {
            padding: 0 20px;
        }

        .cont-m login-form {
            margin-bottom: 60px;
        }

        .cont-m login-form,
        .cont-m join-form {
            --form-padding: 0 20px;
        }
    `,
];
