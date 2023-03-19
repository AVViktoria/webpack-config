const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    index: ["./page1/index.html", "./page1/style.scss"],
    second: ["./page2/second.html", "./page2/second.scss"],
  },
  output: {
    filename: "[name].js", // используем placeholder [name] для динамического имени выходного файла
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "./",
    assetModuleFilename: "images.[name].[ext]",
  },
  mode: "development",
  devServer: {
    devMiddleware: {
      index: true,
      mimeTypes: { phtml: 'text/html' },
      publicPath: './src/page1',
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
      filename: "index.html",
      template: "./page1/index.html",
      chunks: ["index"],
      minify: false,
    }),
  
    new HTMLWebpackPlugin({
      template: "./page2/second.html",
      filename: "second.html",
      chunks: ["second"],
      minify: false,
    }),
  
    new MiniCssExtractPlugin({
      filename: "[name].css",
      ignoreOrder: false
    }),

    // new MiniCssExtractPlugin({
    //     filename: (pathData) => {
    //       return pathData.chunk.name === "index" ? "style.css" : "second.css";
    //     },
    //   }),

    // Удаление старого билда
    new CleanWebpackPlugin(),

    // Для копирования катологов из src в dist
    // new CopyPlugin({
    //   patterns: [
    //     { from: "assets", to: "assets" },
    //   ],
    // }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/i,
        use: "html-loader",
      },
      // Loading js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
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
        include: [
          path.resolve(__dirname, "src/page1/style.scss"),
          path.resolve(__dirname, "src/page2/second.scss"),
        ],

        // Для исключения правил для файла стилей, который не относится к index.html
        // exclude: /second\.scss$/,
      },

      // Loading img
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]", // создает папку в dist и добавляет в нее все изображения
        },
      },

      // Loading fonts
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
    ],
  },
};
