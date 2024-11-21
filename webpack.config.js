const path = require("path");

module.exports = {
  mode: "development",
  entry: "./content.js", // Your main entry file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js"],
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
  externals: {
    "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js": "firebase",
    "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js": "firebase",
  },
};
