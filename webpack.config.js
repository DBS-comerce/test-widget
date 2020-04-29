const path = require("path");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "public"),
    watchContentBase: true,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: ["to-string-loader", "css-loader"],
      },
    ],
  },
};
