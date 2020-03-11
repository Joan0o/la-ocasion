const HtmlWebPackPlugin = require("html-webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "index.html"
});

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  output: {
    path: path.resolve('./dist'),
    filename: 'server.js',
  },
  plugins: [
    htmlPlugin,
    new NodemonPlugin({
      watch: path.resolve('./'),
      script: './server.js',
    }),
    new LiveReloadPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/styles.css'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/notifications.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              // options...
            }
          }
        ]
      }
    ]
  }
};