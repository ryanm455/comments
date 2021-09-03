import { APP_DESCRIPTION, APP_NAME, APP_URL } from "meta";
import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="robots" content="noindex,nofollow" />
          <meta name="googlebot" content="noindex,nofollow" />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={APP_URL} />
          <meta name="twitter:creator" content="@ryanm" />
          <meta property="og:url" content={APP_URL} />
          <meta property="og:title" content={APP_NAME} />
          <meta property="og:description" content={APP_DESCRIPTION} />
          <meta property="og:image" content={APP_URL + "/favicon.svg"} />
          <meta property="og:site_name" content={APP_NAME} />
          <link rel="canonical" href={APP_URL} />
          <meta name="theme-color" content="#FFFFFF" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <body className="bg-white text-gray-800 dark:bg-gray-800 dark:text-whiteAlpha-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
