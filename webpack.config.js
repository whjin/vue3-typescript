const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.ts",
  output: {
    filename: "./bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
        },
        exclude: "/node_modules/",
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "./"),
    compress: true,
    host: "localhost",
    port: 3000,
    historyApiFallback: true,
    open: true,
  },
};
