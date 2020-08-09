const babelPresetEnv = [
  "@babel/preset-env",
  {
    modules: false,
    useBuiltIns: false,
  },
];

const babelPresetEnvTest = [
  "@babel/preset-env",
  {
    targets: {
      node: "current",
    },
  },
];

const babelPresetReact = "@babel/preset-react";

const babelPresetTypescript = [
  "@babel/preset-typescript",
  {
    isTSX: true,
    allExtensions: true,
    allowNamespaces: true,
    allowDeclareFields: true,
    onlyRemoveTypeImports: true, // Only Typescript >= 3.8
  },
];

/**
 * @type {babel.ConfigFunction}
 */
module.exports = (api) => {
  api.cache.forever();

  return {
    presets: [babelPresetEnv, babelPresetReact, babelPresetTypescript],
    env: {
      production: {
        plugins: [["transform-remove-console", { exclude: ["error", "warn"] }]],
      },
      // env.test used by jest with babel-jest.
      test: {
        presets: [babelPresetEnvTest, babelPresetReact, babelPresetTypescript],
      },
    },
  };
};
