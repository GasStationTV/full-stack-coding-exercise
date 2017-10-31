const Path = require('path')
const Webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = env => {
  let plugins = [
    new Webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('bundle.css'),
  ]

  if (env.prod) {
    plugins.concat([
      new Webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new UglifyJSPlugin({
        sourceMap: true,
        exclude: /\*.spec.js/
      })
    ])
  }

  return {
    plugins,
    entry: {
      index: Path.resolve(__dirname, './src/index.js')
    },
      output: {
        filename: 'bundle.js',
          path: Path.resolve(__dirname, './dist/assets'),
          publicPath: '/assets/'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            // Babel will soon have a update to remove the deprecation warning
            options: {
              presets: ['es2015', 'react'],
              plugins: ['transform-class-properties']
            }
          },
          {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
            })
          },
        ]
      },
      devServer: {
        contentBase: Path.resolve(__dirname, './dist/'),
          port: 5000,
          hot: true,
          historyApiFallback: true,
          host: '0.0.0.0',
          disableHostCheck: true,
      },
  }
}
