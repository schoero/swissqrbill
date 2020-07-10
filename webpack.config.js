module.exports = {
  entry: "./src/browser.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ],
  },
  output: {
    filename: "browser.js",
    path: __dirname + "/lib",
  },
};