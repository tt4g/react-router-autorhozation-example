const path = require("path");

const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = !isProduction;
const outputPath = path.resolve(__dirname, "dist/");
const publicPath = "/";
const tsConfigFile = "tsconfig.json";

const babelLoader = { loader: "babel-loader" };
const excludeRule = /(node_modules|bower_components)/;
const enableEsModule = false;
const sourceMap = isDevelopment ? "source-map" : false;

const htmlWebpackPluginTemplatePath = path.join(
  __dirname,
  "webpack",
  "html-webpack-plugin",
  "index.html"
);

/**
 * @type import("webpack").Configuration
 */
module.exports = {
  target: "web",
  entry: {
    App: "./src/components/pages/App.tsx",
  },
  output: {
    path: outputPath,
    publicPath: publicPath,
    filename: "js/[name].[hash].js",
    chunkFilename: "js/[id].[hash].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: ["node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: excludeRule,
        use: [babelLoader],
      },
      {
        test: /\.tsx?$/,
        exclude: excludeRule,
        use: [babelLoader],
      },
      {
        test: /\.css$/,
        exclude: excludeRule,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: publicPath,
              esModule: enableEsModule,
              hmr: isDevelopment,
              // if hmr does not work, this is a forceful method.
              reloadAll: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              url: true,
              import: true,
              sourceMap: isDevelopment,
              importLoaders: 1,
              esModule: enableEsModule,
              modules: {
                mode: "local",
                exportLocalsConvention: "asIs",
                exportOnlyLocals: false,
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              sourceMap: isDevelopment,
              config: {
                path: __dirname,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: tsConfigFile,
        mode: "write-tsbuildinfo",
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      chunks: ["App"],
      template: htmlWebpackPluginTemplatePath,
      filename: "index.html",
      inject: true,
      title: "React Router authorization routing",
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
      },
      scriptLoading: "blocking",
      base: false,
      xhtml: false,
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
      chunkFilename: "css/[id].[hash].css",
      ignoreOrder: false,
    }),
  ],
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        test: /\.m?js(\?.*)?$/i,
        extractComments: false,
        terserOptions: {
          sourceMap: isDevelopment,
          compress: {
            ecma: 5,
            warnings: true,
            comparisons: false,
            // Don't use `inline: 2`.
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
            dead_code: true,
            drop_debugger: true,
            keep_classnames: false,
            keep_fargs: true,
            keep_infinity: false,
            keep_fnames: false,
          },
          mangle: {
            safari10: true,
          },
          keep_classnames: false,
          keep_fnames: false,
          output: {
            ecma: 5,
            ascii_only: true,
            comments: /^\**!|@preserve|@license|@cc_on/i,
          },
        },
      }),
    ],
  },
  devtool: sourceMap,
  devServer: {
    contentBase: outputPath,
    port: 8080,
    publicPath: publicPath,
    index: "index.html",
    hot: true,
    hotOnly: true,
    overlay: true,
  },
};
