import { APP_DESCRIPTION, APP_NAME, APP_URL } from "meta";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { memo } from "react";

const Meta = memo(() => (
  <>
    <NextSeo
      title={APP_NAME}
      description={APP_DESCRIPTION}
      canonical={APP_URL}
      noindex={true}
      nofollow={true}
      openGraph={{
        url: APP_URL,
        title: APP_NAME,
        description: APP_DESCRIPTION,
        // images: [
        //   {
        //     url: , // "https://og.saurish.com/**Plutonium**.png?theme=dark&md=1&fontSize=150px&images=https%3A%2F%2Fsaurish.com%2Flogos%2Flogo.png&images=https%3A%2F%2Fplutonium.saurish.com%2Fplutonium.jpeg"
        //   },
        // ],
        site_name: APP_NAME,
      }}
      twitter={{
        handle: "@ryanm",
        site: APP_URL,
        cardType: "summary_large_image",
      }}
      additionalLinkTags={[
        {
          rel: "manifest",
          href: "/manifest.json",
        },
      ]}
      additionalMetaTags={[
        {
          name: "theme-color",
          content: "#FFFFFF",
        },
      ]}
    />
    <Head>
      <title>{APP_NAME}</title>
    </Head>
  </>
));

export default Meta;
