const path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
})

var PollyFillWebPackPlugin = new webpack.ProvidePlugin({
  'Promise': 'es6-promise',
  'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
})

module.exports = {

  context: __dirname + "/app",

  entry: {
    javascript: "./js/app.js"
  },

  output: {
    filename: "app.js",
    path: __dirname + "/dist",
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: ['react-hot-loader', 'babel-loader'], exclude: /node_modules/ },
    ]
  },

  plugins: [HTMLWebpackPluginConfig, PollyFillWebPackPlugin]

};