import "../wdyr";
import "global.scss";

import React from "react";
import EmbedLayout from "components/embed/EmbedLayout";
import DefaultLayout from "components/layout";
import theme from "lib/theme";
import Head from "next/head";
import { Layout } from "types/layout";

import { Windmill } from "@windmill/react-ui";

import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const EmbedWrap: React.FC = ({ children }) => (
    <EmbedLayout {...pageProps}>{children}</EmbedLayout>
  );

  const L = Component.layout === Layout.Embed ? EmbedWrap : DefaultLayout;

  return (
    <Windmill theme={theme} usePreferences>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <L>
        <Component {...pageProps} />
      </L>
    </Windmill>
  );
};

export default MyApp;
