import "global.scss";
import "../wdyr";

import Layout from "components/layout";
import { APP_NAME } from "meta";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";
import { gqlQuery } from "utils";

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
      <Head>
        <title>{APP_NAME}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <ThemeProvider attribute="class">{componentWithLayout}</ThemeProvider>
    </SWRConfig>
  );
};

export default MyApp;
