module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@config": "./src/config",
          "@controllers": "./src/controllers",
          "@entities": "./src/entities",
          "@middlewares": "./src/middlewares",
          "@models": "./src/models",
          "@routes": "./src/routes",
          "@services": "./src/services",
          "@utils": "./src/utils",
        },
      },
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
};
