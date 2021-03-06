import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const originalRenderPage = ctx.renderPage;
        const sheet = new ServerStyleSheet();

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    // useful for wrapping the whole react tree
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
                });

            // Run the parent `getInitialProps`, it now includes the custom `renderPage`
            const initialProps = await Document.getInitialProps(ctx);

            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        href='https://fonts.googleapis.com/css?family=Oswald:200,300,400?display=optional'
                        rel='stylesheet'
                    />
                    <script
                        async
                        custom-element='amp-story'
                        src='https://cdn.ampproject.org/v0/amp-story-1.0.js'
                    ></script>
                    <script
                        async
                        custom-element='amp-video'
                        src='https://cdn.ampproject.org/v0/amp-video-0.1.js'
                    ></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
