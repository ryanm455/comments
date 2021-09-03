const withPWA = require("next-pwa");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.NODE_ENV === "production",
});

module.exports = withBundleAnalyzer(
  withPWA({
    // experimental: { esmExternals: true }, // if on breaks prisma. idk fix imports and that. import * as types from "lib/gqlTypes"; might be the problem.
    future: {
      poweredByHeader: false,
    },
    pwa: {
      disable: true,// process.env.NODE_ENV === "development", // adds ~2kb to every page and 1kb to shared by all. idk why. worth it to be enabled.
      // delete two lines above to enable PWA in production deployment
      // add your own icons to public/manifest.json
      // to re-generate manifest.json, you can visit https://tomitm.github.io/appmanifest/
      dest: "public",
      register: true,
    },
    webpack(config, { dev, isServer }) {
      if (!dev && !isServer) {
        Object.assign(config.resolve.alias, {
          react: "preact/compat",
          "react-dom/test-utils": "preact/test-utils",
          "react-dom": "preact/compat",
        });
      }

      return config;
    },
  })
);
