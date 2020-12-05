const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = merge(
  {
    mode: "development",
    output: {
      path: path.join(__dirname, "dist"),
      filename: path.join("js", "[name].bundle.js"),
      publicPath: "/",
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "React Chat",
        template: path.resolve(__dirname, "public", "template.ejs"),
      }),
      new MiniCssExtractPlugin({
        filename: path.join("css", "[name].css"),
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: "server",
        analyzerPort: "3333",
        openAnalyzer: false,
      }),
    ],
    devServer: {
      port: 3331,
      hot: true,
      open: "Google Chrome",
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
  },
  common
);
