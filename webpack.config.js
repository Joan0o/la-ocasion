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
  resolve: {
    alias: {
      bulma$: path.resolve(__dirname, 'node_modules/bulma/css/bulma.css')
    }
  },
  mode: 'development',
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].js"
  },
  plugins: [
    htmlPlugin,
    new NodemonPlugin({
      script: './server.js',
    }),
    new LiveReloadPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/mystyles.css'
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