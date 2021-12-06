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
    }
    input, textarea, button {font-family: inherit}
    a {
        color: inherit;
        text-decoration: none;
    }
    .image-scrim {
        filter: brightness(50%)
    }
`;
