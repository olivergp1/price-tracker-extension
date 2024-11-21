const path = require("path");

module.exports = {
  mode: "development", // Change to "production" for production builds
  entry: "./content.js", // Entry point for the bundling process
  output: {
    filename: "bundle.js", // Name of the bundled file
    path: path.resolve(__dirname, "dist"), // Output folder: "dist"
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
          loader: "babel-loader", // Transpile JavaScript files
          options: {
            presets: ["@babel/preset-env"], // Use modern JavaScript features
          },
        },
      },
    ],
  },
};
