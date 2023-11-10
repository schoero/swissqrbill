const webpack = require("webpack");


module.exports = {
  devServer: {
    devMiddleware: {
      publicPath: "/lib/"
    },
    port: 80,
    static: {
      directory: "./"
    }
  },
  devtool: "inline-source-map",
  entry: {
    pdf: "./src/pdf.js"
  },
  module: {
    rules: [
      {
        test: /\.afm$/,
        type: "asset/source"
      },
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
    filename: "[name].js",
    library: "SwissQRBill",
    libraryTarget: "umd",
    path: `${__dirname}/lib/`
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
      "fs": "pdfkit/js/virtual-fs.js",
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
