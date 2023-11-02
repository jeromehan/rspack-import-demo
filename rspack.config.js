const path = require("node:path");
const rspack = require("@rspack/core");
const { VueLoaderPlugin } = require("vue-loader");

const isProduction = process.env.NODE_ENV === "production";
const publicPath = "/";
const { merge } = require("webpack-merge");

function resolve(dir) {
  return path.join(process.cwd(), dir);
}
const webpackPlugins = [
  new VueLoaderPlugin(),
  new rspack.HtmlRspackPlugin({
    template: "index.html",
    filename: isProduction ? "webserver/index.html" : "index.html",
  }),
];

/**
 * @type {import('@rspack/cli').Configuration}
 */
const baseWebpackConfig = {
  cache: false,
  mode: isProduction ? "production" : "development",
  context: __dirname,
  entry: {
    main: "./src/main.ts",
  },
  output: {
    clean: true,
    publicPath,
    cssFilename: "static/css/[name].[contenthash:8].css",
    filename: "static/js/[name].[contenthash:8].js",
    cssChunkFilename: "static/css/[name].[contenthash:8].css",
    chunkFilename: "static/js/[name].[contenthash:8].js",
  },
  builtins: {
    devFriendlySplitChunks: true,
    // pluginImport: [
    //   {
    //     libraryName: "vant",
    //     style: "{{ kebabCase member }}/style/index.js",
    //   },
    // ],
  },
  devServer: {
    https: true,
    hot: true,
    host: "local-ip",
    port: 8089,
    allowedHosts: "all",
    historyApiFallback: true,
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
        resourceQuery: /lang=ts/, // 如果需要在 Vue SFC 里使用 Typescript, 请添加该规则
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
  experiments: {
    css: true,
  },
  resolve: {
    extensions: [".mjs", ".js", "jsx", ".ts", ".tsx", ".vue"],
    alias: {
      "@": resolve("src"),
      "@src": resolve("src"),
    },
  },
  optimization: {
    chunkIds: 'named',
    realContentHash: true,
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      minSize: 20000,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    }
  },
  plugins: webpackPlugins,
  // stats: 'verbose'
};
let offlineWebpackConfig = {};
module.exports = merge(baseWebpackConfig, offlineWebpackConfig);
