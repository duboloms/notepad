const path = require("path");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PATHS = {
  app: path.join(__dirname, "../src/assets/js/app.js"),
  src: path.join(__dirname, "../src"),
  dist: path.join(__dirname, "../dist")
}

module.exports = {
  mode: "development",
  entry: {
    app: PATHS.app
  },
  output: {
    filename: "[name].js",
    path: PATHS.dist,
    publicPath: "/"
  },
  devtool: 'cheap-module-source-map', // Content Security Policy
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules/"
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true }
          }, {
            loader: "sass-loader",
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  devServer: {
    port: 5000,
    overlay: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/scss/[name].scss"
    })
  ]
};
