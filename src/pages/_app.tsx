import "global.scss";
import "../wdyr";

import React from "react";

import Layout from "components/layout";
import theme from "lib/theme";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";
import { gqlQuery } from "utils";

import { Windmill } from "@windmill/react-ui";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const getLayout =
    Component.getLayout || ((page: React.ReactNode) => <Layout>{page}</Layout>);

  const componentWithLayout = getLayout(
    <Component {...pageProps} />,
    pageProps
  );

  return (
    <SWRConfig
      value={{
        fetcher: (res: string, vari: object) => gqlQuery(res, vari),
      }}
    >
      <Windmill theme={theme} usePreferences>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
        </Head>
        {componentWithLayout}
      </Windmill>
    </SWRConfig>
  );
};

export default MyApp;
