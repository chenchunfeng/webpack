const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    // index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },
  mode: 'production',
  module: {
  rules: [
    { test: /\.js$/, use: 'babel-loader' },
    { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
  ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
}