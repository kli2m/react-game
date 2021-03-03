const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, options) => {
  const isProduction = options.mode === "production";

  const config = {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "none" : "source-map",
    entry: ["./src/index.js"],
    output: {
      path: path.join(__dirname, "./dist"),
      filename: "index.js",
    },
    devServer: {
      contentBase: path.join(__dirname, "/dist"),
    
      port: 9000,
     
    },
    module: {
      rules: [
      
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
          },
        },

        {
          test: /\.(sa|sc|c)ss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|svg|mp3)$/i,
          exclude: [/node_modules/],
          loader: "file-loader",
          options: {
            name: "assets/[contenthash].[ext]",
            outputPath: "assets/",
            publicPath: "assets/",
          },
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
        },
      }),
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
      new CopyPlugin({
        patterns: [
          { from: "./src/assets/img", to: "assets/img" },
          { from: "./src/assets/audio", to: "assets/audio" },
        ],
        options: {
          concurrency: 100,
        },
      }),
    ],
  };
  return config;
};
