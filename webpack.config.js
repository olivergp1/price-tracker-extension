const path = require("path");

module.exports = {
  mode: "production", // Ensure production mode is set
  entry: "./content.js", // Entry point for the extension
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  resolve: {
    fallback: {
      fs: false,
    },
  },
  devtool: false, // Remove source maps to avoid eval() usage
};
