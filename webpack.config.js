const path = require("path");

module.exports = {
  mode: "development", // Use "production" for production builds
  entry: "./content.js", // Your main script file
  output: {
    filename: "bundle.js", // Name of the bundled output file
    path: path.resolve(__dirname, "dist"), // Path to the output directory
  },
  resolve: {
    extensions: [".js"], // File extensions Webpack will process
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to `.js` files
        exclude: /node_modules/, // Exclude dependencies in `node_modules`
        use: {
          loader: "babel-loader", // Use Babel for transpiling JavaScript
          options: {
            presets: ["@babel/preset-env"], // Use modern JavaScript features
          },
        },
      },
    ],
  },
};
