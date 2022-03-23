const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports =  {
  mode: 'none',
  entry: {
    'large-number-ccf': path.resolve(__dirname, './src/index.js'),
    'large-number-ccf.min': path.resolve(__dirname, './src/index.js')
  },
  output: {
    filename: '[name].js',
    clean: true,
    libraryTarget: 'umd',
    library: 'largeNumber',
    libraryExport: 'default'
  },
  // plugins: [
  //   new CleanWebpackPlugin(),
  // ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      })
    ]
  }
}