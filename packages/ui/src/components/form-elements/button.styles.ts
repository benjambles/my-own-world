import { css } from 'lit';

export const buttonStyles = css`
    button {
        --_btnColor: var(--color, var(--shade-1));
        --_btnBgColor: var(--bgColor, #f57723);
        --_btnBorderColor: var(--borderColor, var(--_btnBgColor));
        --_btnPadding: var(--btnPadding, 10px 20px);
        --_btnFontSize: var(--btnFontSize, 1.6rem);

        padding: var(--_btnPadding);
        font-size: var(--_btnFontSize);
        color: var(--_btnColor);
        border: 0;
        border-radius: 5px;
        cursor: pointer;
        transition:
            background-color 0.3s,
            color 0.3s,
            border-color 0.3s;
        border: 1px solid var(--_btnBorderColor);
        background-color: var(--_btnBgColor);
        text-transform: uppercase;
        font-family: 'Oxanium', monospace;
        font-weight: 500;
        letter-spacing: 0.3ch;
        line-height: 1;
    }

    button:is(:hover, :focus) {
        --bgColor: #b95a1a;
    }

    button.large {
        --btnFontSize: 1.8rem;
        --btnPadding: 20px;
    }

    button.small {
        --btnPadding: 5px 10px;
        --btnFontSize: 1.1rem;
    }

    button.primary {
        --bgColor: #2b792b;
    }

    button.primary:is(:hover, :focus) {
        --bgColor: #1b4b1b;
    }

    button.destructive {
        --bgColor: #ac2222;
    }

    button.destructive:is(:hover, :focus) {
        --bgColor: #6b1515;
    }

    button.outline {
        --bgColor: transparent;
        --color: var(--shade-4);
        --borderColor: var(--shade-4);
    }

    button.outline:is(:hover, :focus) {
        --bgColor: #f57723;
        --color: var(--shade-1);
        --borderColor: #f57723;
    }

    button.text {
        --color: var(--shade-4);
        --bgColor: transparent;
    }

    button.text:is(:hover, :focus) {
        --color: #f57723;
        --bgColor: transparent;
    }
`;
