const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

var browserConfig = {
  entry: './src/browser/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' }
    ]
  },  
  plugins: [
    new webpack.DefinePlugin({
      IS_BROWSER: JSON.stringify(true)
    })
  ],
  target: 'web',
  mode: process.env.NODE_ENV
}

var serverConfig = {
  entry: './src/server/index.js',
  target: 'node',
  //externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
    ]
  },
  resolve: {
    alias: {
      'node-fetch$': "node-fetch/lib/index.js"
    }
  },
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      IS_BROWSER: JSON.stringify(false)
    })
  ],
  target: 'node',
  mode: process.env.NODE_ENV
}

module.exports = [browserConfig, serverConfig]
