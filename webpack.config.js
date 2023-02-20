const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/ts/main.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
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
};
