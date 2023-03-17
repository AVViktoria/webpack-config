const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "./", // изменяем путь к ресурсам
    assetModuleFilename: path.join("assets", "[name].[contenthash][ext]"),
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
    minimizer: [
      "...",
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      filename: "index.html",
    }),

    // Удаление старого билда
    new CleanWebpackPlugin(),

    // Для более быстрой перезагрузки измененных модулей без полной перезагрузки страницы
    new webpack.HotModuleReplacementPlugin(),

    new MiniCssExtractPlugin({
      filename: "style.css",
    }),

    // Для копирования катологов из src в dist
    // new CopyPlugin({
    //   patterns: [
    //     { from: "assets", to: "assets" },
    //   ],
    // }),
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
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext]", // изменяем путь к ресурсам
        },
      },

      // Loading fonts and SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: "asset/inline",
      },

      {
        // test: /\.svg$/,
        // type: "asset/resource",
        // Переопределяет assetModuleFilename, для формата svg создает папку "icons" в dist для удобства
        // generator: {
        //   filename: path.join("icons", "[name].[contenthash][ext]"),
        // },
      },
    ],
  },
};
