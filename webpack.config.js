const HtmlWebPackPlugin = require("html-webpack-plugin");
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
    new LiveReloadPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/styles.css'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/notifications.css'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    }
  },
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
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: 'http://localhost:5001/papeleria-ba86e/us-central1/api'
    })
  }
};