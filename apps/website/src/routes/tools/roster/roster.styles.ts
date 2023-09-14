import { callOutStyles, flexColToRow, outlineButton } from '@benjambles/mow-ui/styles.js';
import { CSSResult, css } from 'lit';

export const rosterStyles: CSSResult[] = [
    flexColToRow,
    callOutStyles,
    outlineButton,
    css`
        .col-to-row {
            --col-to-row-gap: 20px;
        }

        .card-list {
            list-style: none;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));
            grid-auto-rows: minmax(100px, auto);
            gap: 30px;
            padding: 0;
            margin: 50px 0;
        }

        .panel {
            padding: 0 6rem;
        }

        h1 {
            margin: 12rem 0 8rem;
            font-size: 6rem;
        }

        .card {
            --co-bg-color: #ccc;
            display: flex;
            flex-direction: column;
            padding: 30px 20px;
            position: relative;
            text-transform: capitalize;
        }

        .card > a {
            flex: 1 1 100%;
            display: flex;
            flex-direction: column;
            margin: 40px 0;
            color: #333;
            font-size: 1.8rem;
        }

        .card span {
            padding-bottom: 5px;
        }

        .card span:first-child {
            padding-bottom: 15px;
            color: var(--shade-5);
            font-family: 'Oxanium', monospace;
            font-size: 2.6rem;
        }

        .card a:hover span:first-child,
        .card a:focus span:first-child {
            color: rgba(255, 0, 0, 0.8);
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
