import {
    callOutStyles,
    containerMC,
    flexColToRow,
    gradientText,
    outlineButton,
} from '@benjambles/mow-ui/styles.js';
import { CSSResult, css } from 'lit';

export const rosterStyles: CSSResult[] = [
    flexColToRow,
    callOutStyles,
    outlineButton,
    gradientText,
    containerMC,
    css`
        .col-to-row {
            --col-to-row-gap: 20px;
        }

        .panel {
            padding: 0 6rem;
        }

        h1 {
            margin: 8rem 0 4rem;
            font-size: 6rem;
        }

        mow-action {
            flex: 1 1 100%;
            display: flex;
        }

        create-skirmish[ismodal] {
            --cs-width: 500px;
            --form-padding: 35px 0 0;
        }
    `,
];

/*
.ring {
    position: fixed;
    bottom: -40%;
    right: 0%;
    width: 80%;
    aspect-ratio:1/1;
    display:flex;
    opacity:0.1;
}

.ring:after {
    content: ' ';
    border: 40px solid white;
    border-radius:50%;
    width:100%;
    position:absolute;
    aspect-ratio:1/1;
    top:0;
    left:0;
}

.ring:before {
    content: ' ';
    border: 40px solid white;
    border-radius:50%;
    width: 70%;
    aspect-ratio:1/1;
    position:absolute;
    top: 15%;
    left: 15%;
}

*/
