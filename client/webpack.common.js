const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

const path = require("path");

module.exports = {
  performance: {
    hints: false,
  },
  entry: {
    main: path.resolve(__dirname, "src", "index.jsx"),
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
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public/assets/images/favicon.png", to: "assets/images/" },
        { from: "public/sw.js" },
      ],
    }),
    new HtmlWebpackTagsPlugin({
      links: [
        {
          path: "assets/images/favicon.png",
          attributes: {
            rel: "icon",
          },
        },
      ],
    }),
    new WebpackPwaManifest({
      name: "React Chat",
      short_name: "ReactChat",
      description: "React Chat!",
      background_color: "#3f4b5b",
      theme_color: "#8dd0ff",
      crossorigin: "use-credentials",
      start_url: "/login",
      display: "standalone",
      fingerprints: false,
      filename: "assets/manifest.json",
      ios: true,
      icons: [
        {
          src: path.resolve("public/assets/images/icon.png"),
          sizes: [120, 152, 167, 180, 1024],
          destination: path.join("assets", "images"),
          ios: true,
        },
        {
          src: path.resolve("public/assets/images/icon.png"),
          size: 1024,
          destination: path.join("assets", "images"),
          ios: "startup",
        },
        {
          src: path.resolve("public/assets/images/icon.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("assets", "images"),
        },
        {
          src: path.resolve("public/assets/images/icon.png"),
          size: "1024x1024",
          purpose: "maskable",
          destination: path.join("assets", "images"),
        },
      ],
    }),
  ],
};
