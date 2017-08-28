const path = require('path');

module.exports = {
  entry: './public/src/js/app.js',
  output: {
    path: path.join(__dirname, 'public', 'dist', 'js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-0']
      }
    }, {
      test: /\.css?$/,
      loader: ['style-loader', 'css-loader']
    }, {
      test: /\.scss?$/,
      loader: ['style-loader', 'css-loader', 'sass-loader']
    }]
  }
};
