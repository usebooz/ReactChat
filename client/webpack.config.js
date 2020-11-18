const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");

const path = require("path");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src", "index.jsx"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: path.join("js", "bundle.js"),
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            [
              "@babel/plugin-proposal-class-properties",
              {
                loose: true,
              },
            ],
            ["@babel/plugin-transform-runtime"],
          ],
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          outputPath: "assets/images",
          name: "[name].[ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        loader: "file-loader",
        options: {
          outputPath: "assets/fonts",
          name: "[name].[ext]",
        },
      },
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   include: /public\/assets\//,
      //   loader: "file-loader",
      //   options: {
      //     outputPath: "assets/images",
      //     name: "[name].[ext]",
      //   },
      // },
      // {
      //   test: /\.webmanifest$/,
      //   include: /public\/assets\//,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         outputPath: "assets/",
      //         name: "[name].[ext]",
      //       },
      //     },
      //     {
      //       loader: "webmanifest-loader",
      //       options: {
      //         name: "React Chat",
      //         shortName: "ReactChat",
      //         description: "",
      //       },
      //     },
      //   ],
      // }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: path.join("", "[name].css"),
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      title: "React Chat",
      template: path.resolve(__dirname, "public", "template.ejs"),
    }),
    new FaviconsWebpackPlugin(
      path.resolve(__dirname, "public/assets", "favicon.ico")
    ),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, "src/utils/service-worker.js"),
    }),
  ],
  devServer: {
    port: 3331,
    hot: true,
    open: false,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://localhost:3332",
        pathRewrite: { "^/api": "" },
        secure: false,
        changeOrigin: true,
      },
    },
  },
};
