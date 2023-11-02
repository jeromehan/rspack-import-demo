const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isProduction = process.env.NODE_ENV === "production";
const webpackPlugins = [
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    template: "index.html",
    filename: isProduction ? "webserver/index.html" : "index.html",
  }),
];
function resolve(dir) {
  return path.join(process.cwd(), dir);
}
/**
 * @type {import('webpack').Configuration}
 * */
module.exports = {
  // devtool: false,
  mode: isProduction ? "production" : "development",
  context: __dirname,
  entry: {
    main: "./src/main.ts",
  },
  experiments: {
		css: true
	},
  output: {
    path: path.join(__dirname, "dist"),
    cssFilename: "static/css/[name].[contenthash:8].css",
    filename: "static/js/[name].[contenthash:8].js",
    cssChunkFilename: "static/css/[name].[contenthash:8].css",
    chunkFilename: "static/js/[name].[contenthash:8].js",
  },
  optimization: {
    realContentHash: true,
    splitChunks: {
      cacheGroups: {
        someVendor: {
          chunks: "all",
          minChunks: 2,
        },
      },
    },
  },
  devServer: {
    https: true,
    hot: true,
    host: "local-ip",
    port: 8090,
    allowedHosts: "all",
    historyApiFallback: true,
  },
  optimization: {
    chunkIds: "natural",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              experimentalInlineMatchResource: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ["sass-loader"],
        type: "css",
      },
      {
        test: /\.less$/,
        use: ["less-loader"],
        type: "css",
      },
      {
        resourceQuery: /lang=ts/,
        type: "ts",
      },
      {
        test: /\.(png|jpe?g|gif|svg)/i,
        type: "asset/resource",
        generator: {
          filename: "static/img/[name].[hash:8][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/font/[name].[hash:8][ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".mjs", ".js", "jsx", ".ts", ".tsx", ".vue"],
    alias: {
      "@": resolve("src"),
      "@src": resolve("src"),
    },
  },
  plugins: webpackPlugins
};
