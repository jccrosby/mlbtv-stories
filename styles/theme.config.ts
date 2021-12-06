import { createGlobalStyle } from 'styled-components';
export const lightTheme = {
    body: '#fffff',
    main: '#5C14DB',
    mainColor: '#FFFFFF',
    accent: '#E5DE17',
    accentColor: '#161616',
    secondary: '#FFFFFF',
    secondaryColor: '#343434',
    dullColor: '#343434',
    ternary: '#000000',
    codeColor: '#D121C5',
};

export const darkTheme = {
    body: '#363537',
    background: '#000',
    text: '#FAFAFA',
    main: '#5C14DB',
    mainColor: '#363537',
    accent: '#E5DE17',
    accentColor: '#161616',
    secondary: '#363537',
    secondaryColor: '#343434',
    dullColor: '#343434',
    ternary: '#000000',
    codeColor: '#D121C5',
};
export const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    html,
    body {
        margin: 0;
        padding: 0;
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        font-weight: 400;
        font-style: normal;
        transition: all 0.50s linear;
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both
    }
    @-webkit-keyframes -amp-start {
        from {
            visibility: hidden;
        }

        to {
            visibility: visible;
        }
    }

    @-moz-keyframes -amp-start {
        from {
            visibility: hidden;
        }

        to {
            visibility: visible;
        }
    }

    @-ms-keyframes -amp-start {
        from {
            visibility: hidden;
        }

        to {
            visibility: visible;
        }
    }

    @-o-keyframes -amp-start {
        from {
            visibility: hidden;
        }

        to {
            visibility: visible;
        }
    }

    @keyframes -amp-start {
        from {
            visibility: hidden;
        }

        to {
            visibility: visible;
        }
    }

    input, textarea, button {font-family: inherit}

    a {
        color: inherit;
        text-decoration: none;
    }

    .image-scrim {
        filter: brightness(50%)
    }

    .bottom {
        align-content: end;
    }
    #video-hint {
        /* Position relative to its container: */
        position: absolute;
        right: 0;
        bottom: 25%;
        /* Typography: */
        line-height: 1;
        font-size: 13px;
        /* Borders, colors and sizing */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
        border-radius: 16px 0 0 16px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 16px;
        /* Position on top of the video: */
        z-index: 100;
        /* Translate-x by 100% to displace out of view: */
        transform: translateX(100%);
        pointer-events: none;
        display: none;
    }
    /* Display hint only on touch devices */
    .amp-mode-touch #video-hint {
        display: block;
    }

`;
