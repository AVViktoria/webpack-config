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
    assetModuleFilename: './assets/[name].[ext]',
    publicPath: "./"
  },
  
  mode: "development",
  devServer: {
    devMiddleware: {
      index: true,
      mimeTypes: { phtml: 'text/html' },
      publicPath: '/src',
      serverSideRender: true,
      writeToDisk: true,
    },
    static: "dist",
    watchFiles: path.join(__dirname, "src"),
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
      filename: 'index.html',
      template: 'index.html',
    }),
  
    // Удаление старого билда
    new CleanWebpackPlugin(),
  
    // new webpack.HotModuleReplacementPlugin(),
  
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

      // Используется для того, чтобы обновлялись пути к изображениям при сборке в html файле
      {
        test: /\.html$/i,
        loader: "html-loader",
      },

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
          filename: "assets/[name].[ext]", // создает папку и помещает в нее изображения
        },
      },

      // Loading fonts and SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[ext]", // создает папку и помещает в нее шрифты
        },
      },
    ],
  },
};
