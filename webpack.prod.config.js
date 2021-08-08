global.Promise = require("bluebird");
const path = require("path");
const webpack = require("webpack");
const zlib = require("zlib");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  target: "web",
  entry: {
    main: "./src/index.tsx"
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js",
    globalObject: "this"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".jsx", ".js", ".json"],
    fallback: {
      fs: false,
      os: false,
      path: false
    }
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      REACT_APP_WSS_SERVER: "wss://chatizze-messages-service.herokuapp.com",
      DEBUG: false
    }),
    new webpack.ProgressPlugin(),
    new webpack.ProvidePlugin({
      process: "process/browser"
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: "./src/sw.js",
      swDest: "sw.js"
    }),
    new CompressionPlugin({
      filename: "[name][ext].br",
      algorithm: "brotliCompress",
      test: /\.js$|css$|ts$|tsx$/,
      exclude: "server.js",
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11
        }
      },
      // threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./public/app-store-badge.png", to: "app-store-badge.png" },
        { from: "./public/google-play-badge.png", to: "google-play-badge.png" },
        { from: "./public/chat-demo-r-min.png", to: "chat-demo-r.png" },
        { from: "./public/download-r-min.png", to: "download-r.png" },
        { from: "./public/google.png", to: "google.png" },
        { from: "./public/google_active.png", to: "google_active.png" },
        { from: "./public/google_focus.png", to: "google_focus.png" },
        { from: "./public/intro-chat-r-min.png", to: "intro-chat-r.png" },
        { from: "./public/manifest.json", to: "manifest.json" },
        { from: "./public/locale", to: "locale" },
        { from: "./public/robots.txt", to: "robots.txt" },
        { from: "./public/manifest-icons", to: "manifest-icons" },
        { from: "./src/server.js", to: "server.js" }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css"
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: path.join(__dirname, "src"),
        loader: "ts-loader"
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "img/",
              name: "[name].[ext]",
              emitFile: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "fonts/",
              name: "[name].[ext]",
              emitFile: true
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: undefined,
          parse: {},
          compress: {},
          mangle: true,
          module: false,
          output: null,
          format: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          // eslint-disable-next-line camelcase
          keep_classnames: undefined,
          // eslint-disable-next-line camelcase
          keep_fnames: false,
          safari10: false
        }
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true }
            }
          ]
        }
      })
    ],
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};