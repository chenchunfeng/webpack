const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    // index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },
  mode: 'production',
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
        use: {
          loader: 'file-loader', 
          options: {
            name: 'fonts/[name]-[hash:8].[ext]'
          }
        },

      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/search.html'})
  ]
}