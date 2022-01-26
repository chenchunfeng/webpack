const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].[chunkhash].js',
  },
  mode: 'development',
  module: {
    rules: [
      { 
        test: /\.js$/,
        use: 'babel-loader'
      },
      { 
        test: /\.less$/, 
        use: ['style-loader', 'css-loader', 'less-loader'] 
      },
      { 
        test: /\.(jpg|png|gif|bmp|jpeg)$/, 
        use: [
          { 
            loader: 'url-loader', 
            options: {
              limit: 8 * 1024,
              name: 'images/[name]-[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        // type: 'asset/resource', webpack 5
        use: [
        {
          loader: 'file-loader', 
          options: {
            name: 'fonts/[name]-[hash:8].[ext]',
            esModule: false
          }
        }],
        type: 'javascript/auto'
      },
      {
        test: /.txt$/,
        // type: 'asset/resource', webpack 5
        use: [
        {
          loader: 'raw-loader', 
          options: {
            esModule: false
          }
        }],
        type: 'javascript/auto'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html', filename: 'index.html',chunks: ['index'],}),
    new HtmlWebpackPlugin({template: './src/search.html', filename: 'search.html',chunks: ['search'],}),
    new CleanWebpackPlugin(),
    new HotModuleReplacementPlugin(),
  ],
  devServer: {
    static: __dirname + '/dist',
    hot: true
  }
}