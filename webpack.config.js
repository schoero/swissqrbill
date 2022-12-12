const webpack = require("webpack");


module.exports = {
  devtool: "inline-source-map",
  entry: "./src/browser/bundle.ts",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|ts)?$/,
        use: "ts-loader"
      },
      // bundle and load afm files verbatim
      {
        test: /\.afm$/,
        type: "asset/source"
      },
      // convert to base64 and include inline file system binary files used by fontkit and linebreak
      {
        enforce: "post",
        loader: "transform-loader",
        options: {
          brfs: {}
        },
        test: /fontkit[/\\]index.js$/
      },
      {
        enforce: "post",
        loader: "transform-loader",
        options: {
          brfs: {}
        },
        test: /linebreak[/\\]src[/\\]linebreaker.js/
      }
    ]
  },
  output: {
    filename: "index.js",
    library: "SwissQRBill",
    libraryTarget: "umd",
    path: `${__dirname}/lib/browser/bundle/`
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser"
    }),
    new webpack.NormalModuleReplacementPlugin(new RegExp(/\.js$/), resource => {
      if(resource.context.includes("node_modules") !== true){
        resource.request = resource.request.replace(".js", "");
      }
    })
  ],
  resolve: {
    alias: {
      // maps fs to a virtual one allowing to register file content dynamically
      "fs": "pdfkit/js/virtual-fs.js",
      // iconv-lite is used to load cid less fonts (not spec compliant)
      "iconv-lite": false
    },
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      assert: require.resolve("assert/"),
      buffer: require.resolve("buffer"),
      crypto: false,
      stream: require.resolve("readable-stream"),
      util: require.resolve("util"),
      zlib: require.resolve("browserify-zlib")
    }
  },
  target: "web"
};
