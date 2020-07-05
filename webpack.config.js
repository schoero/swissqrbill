const path = require("path");
module.exports = {
  resolve: {
    alias: {
      fs: "pdfkit/js/virtual-fs.js"
    }
  },
  entry:  __dirname + "/lib/browser.js",
  output: {
    path: __dirname + "/lib/",
    filename: "browser.js"
  },
  module: {
    rules: [
      { enforce: "post", test: /fontkit[/\\]index.js$/, loader: "transform-loader?brfs" },
      { enforce: "post", test: /unicode-properties[/\\]index.js$/, loader: "transform-loader?brfs" },
      { enforce: "post", test: /linebreak[/\\]src[/\\]linebreaker.js/, loader: "transform-loader?brfs" },
      { test: /\.afm$/, loader: "raw-loader" }
    ]
  },
  devtool: "sourcemap"
};