const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    // Для формата ico|gif|png|jpg|jpeg создает папку "images" в dist для удобства
    assetModuleFilename: path.join("images", "[name].[contenthash][ext]"),
  },

  mode: "development",
  devServer: {
    static: "./dist",
    watchFiles: path.join(__dirname, "src"),
    port: 9000,
    hot: true,
    client: {
      overlay: true,
      logging: "info",
      progress: true,
    },
  },
  resolve: {
    alias: {
      "webpack-dev-server": path.resolve(
        __dirname,
        "node_modules/webpack-dev-server"
      ),
    },
  },
  optimization: {
      minimize: false,

    // Это не работает при dev, нужно фиксить

    // minimizer: [
      // new ImageMinimizerPlugin({
      //   minimizer: {
      //     implementation: ImageMinimizerPlugin.imageminMinify,
      //     options: {
      //       plugins: [
      //         ["gifsicle", { interlaced: true }],
      //         ["jpegtran", { progressive: true }],
      //         ["optipng", { optimizationLevel: 5 }],
      //         ["svgo", { name: "preset-default" }],
      //       ],
      //     },
      //   },
      // }),
    // ],
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      filename: "index.html",
    }),

    // Удаление старого билда
    new CleanWebpackPlugin(),

    // Применять изменения только при горячей перезагрузке
    new webpack.HotModuleReplacementPlugin(),
    
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],

  module: {
    rules: [
      // Loading js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },

      // Loading CSS, PostCSS, Sass
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },

      // Loading img
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },

      // Loading fonts and SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: "asset/inline",
      },

      {
        test: /\.svg$/,
        type: "asset/resource",
        // Переопределяет assetModuleFilename, для формата svg создает папку "icons" в dist для удобства
        generator: {
          filename: path.join("icons", "[name].[contenthash][ext]"),
        },
      },
    ],
  },
};
