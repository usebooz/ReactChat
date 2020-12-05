const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = merge(
  {
    mode: "production",
    devtool: "source-map",
    output: {
      path: path.join(__dirname, "dist"),
      filename: path.join("js", "[name].[contenthash].bundle.js"),
      publicPath: "/",
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
      minimizer: [
        new OptimizeCssAssetsPlugin(),
        new TerserPlugin(),
        new HtmlWebpackPlugin({
          minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
          },
        }),
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "React Chat",
        template: path.resolve(__dirname, "public", "template.ejs"),
      }),
      new MiniCssExtractPlugin({
        filename: path.join("css", "[name].[contenthash].css"),
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false,
      }),
    ],
  },
  common
);
