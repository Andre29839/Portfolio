import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </Head>

      <body data-theme="dark" tabIndex={-1}>
        <script
          dangerouslySetInnerHTML={{
            __html: `const initialTheme = JSON.parse(localStorage.getItem("theme"));
                  document.body.dataset.theme = initialTheme || 'dark'`,
          }}
        />
        <Main />
        <NextScript />
        <div id="root" />
      </body>
    </Html>
  );
}
