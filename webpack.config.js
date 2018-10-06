// webpack.config.js

const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
//const nodeExternals = require('webpack-node-externals');

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
  /*
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    })
  ]
  */
  target: 'web',
  mode: 'development'
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
  
  plugins: [
    new Dotenv()
  ],
  target: 'node',
  mode: 'development'
}

module.exports = [browserConfig, serverConfig]

//{ test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [ 'css-loader' ] }) },
