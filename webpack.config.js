const path = require("path");

module.exports = {
  mode: "development", // or "development" if needed, but configure devtool appropriately
  entry: "./content/content.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map", // instead of using an eval-based devtool
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
