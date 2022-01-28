const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');
const CssMinimizer = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].[chunkhash].js',
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      'overrideBrowserslist': [    
                        "> 1%",
                        "last 2 versions",
                        "not ie <= 8",
                        "ios >= 8",
                        "android >= 4.0"
                      ]
                    },
                  ],
                ]
              }
            }
          }
        ] 
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
    new HtmlWebpackPlugin({
      template: './src/search.html',
      filename: 'search.html',
      chunks: ['search'],
      minify: {
        html5: true,
        collapseWhitespace: true,  // 折叠空白
        preserveLineBreaks: false, // 如果为true 折叠空白保留一个
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].css'
    }),
  ],
  optimization: {
    // minimize: false, // 默认为true 使用terse处理
    // 自定义配置压缩
    // minimizer: [new UglifyJsPlugin()],
    // minimizer: [new TerserPlugin()],
    minimizer: [ 
      `...`,  // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`）
      //  new OptimizeCssAssets({
      //    assetNameRegExp: /\.css$/g,  // 默认值
      //    cssProcessor: require('cssnano') // 默认值
      //  })
      // new CssMinimizer()
    ]
  },
}