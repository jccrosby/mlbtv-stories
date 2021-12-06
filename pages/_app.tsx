import React from 'react';
import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import { GlobalStyles, darkTheme } from '../styles/theme.config';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={darkTheme}>
            <GlobalStyles />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
