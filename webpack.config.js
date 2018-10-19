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
  plugins: [
    new webpack.DefinePlugin({
      IS_BROWSER: JSON.stringify(true)
    })
  ],
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
  devServer: {
    historyApiFallback: true
  },
  target: 'node',
  mode: 'development'
}

module.exports = [browserConfig, serverConfig]

//{ test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [ 'css-loader' ] }) },
