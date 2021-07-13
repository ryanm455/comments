import "../wdyr";

import EmbedLayout from "components/embed/EmbedLayout";
import DefaultLayout from "components/layout";
import Head from "next/head";
import { Layout } from "types/layout";

import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const EmbedWrap: React.FC = ({ children }) => (
    <EmbedLayout {...pageProps}>{children}</EmbedLayout>
  );
  // @ts-ignore
  const L = Component.layout === Layout.Embed ? EmbedWrap : DefaultLayout;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <L>
        <Component {...pageProps} />
      </L>
    </>
  );
};

export default MyApp;
