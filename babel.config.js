module.exports = api => {
  const isServer = api.caller(caller => caller?.isServer);
  const isDevelopment = api.caller(caller => caller?.isDev);

  return {
    presets: [
      [
        "next/babel",
        {
          "preset-react": {
            importSource:
              !isServer && isDevelopment
                ? "@welldone-software/why-did-you-render"
                : "react",
          },
        },
      ],
    ],
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      "babel-plugin-transform-typescript-metadata",
    ],
  };
};
