var path = require('path');

var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var packageData = require('./package.json');

var filename = [packageData.name, packageData.version, 'js'];

module.exports =[ {
      entry: path.resolve(__dirname,'src/client/index.js' ),
      output: {
          path: path.resolve(__dirname, 'build/client'),
          filename: filename.join('.'),
      }
    ,
    devtool: 'source-map',
    module: {
      loaders: [
        {
           test: /\.jsx?$/,         // Match both .js and .jsx files
           exclude: /node_modules/,
           loader: "babel-loader",
           query:
           {
              presets:['react','es2015'],
              plugins: ["transform-es2015-destructuring", "transform-object-rest-spread"]
           }
        },
        { test: /\.css$/, use: [ 'css-loader' ] }
      ]

    }
  },
  {
        entry: path.resolve(__dirname,'src/server/server.js' ),
        output: {
            path: path.resolve(__dirname, 'build/server'),
            filename: 'server.bundle.js',
        }
      ,
      devtool: 'source-map',
      module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-1']
            }
        }]

      },
      target: 'node',
      externals: [nodeExternals()]
    }
]
