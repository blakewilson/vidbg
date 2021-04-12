const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { BannerPlugin } = require("webpack");
const pck = require("./package.json");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = () => {
  return {
    mode: "production",
    entry: "./src/vidbg.ts",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "vidbg.js",
      library: "vidbg",
      libraryTarget: "umd",
      libraryExport: "default",
      globalObject: "this",
    },
    optimization: {
      minimizer: [new TerserPlugin({ extractComments: false })],
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-proposal-class-properties"],
            },
          },
          test: /\.js$/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js", ".json"],
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: "src/styles" }],
      }),
      new BannerPlugin(
        [
          `vidbg.js v${pck.version} (https://github.com/blakewilson/vidbg)`,
          `vidbg.js by ${pck.author}`,
          `@license MIT (https://github.com/blakewilson/vidbg/blob/master/LICENSE)`,
        ].join("\n")
      ),
    ],
  };
};
