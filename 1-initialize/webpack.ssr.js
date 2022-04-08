const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');
const CssMinimizer = require('css-minimizer-webpack-plugin');
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const path = require('path');
const glob = require('glob');
const setMPA = function() {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index-server.js'));
  entryFiles.forEach(fileUrl => {
    // 匹配文件名做为entry入口
    const match = fileUrl.match(/src\/(.*)\/index-server\.js/);
    if (!match) return;
    const pageName = match[1];

    entry[pageName] = fileUrl;
    htmlWebpackPlugins.push(    
      new HtmlWebpackPlugin({
        template: `./src/${pageName}/index.html`,
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,  // 折叠空白
          preserveLineBreaks: false, // 如果为true 折叠空白保留一个
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      })
    )
  })
  
  return {
    entry,
    htmlWebpackPlugins
  }
}
const {entry, htmlWebpackPlugins} = setMPA();

module.exports = {
  entry,
  output: {
    path: __dirname + '/dist-ssr',
    filename: '[name]-server.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    publicPath: '',
    libraryExport: 'default'
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
          {
            loader: 'px2rem-loader',
            options: {
                remUnit: 75,
                remPrecision: 8
            }
          },
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
    ...htmlWebpackPlugins,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].css'
    }),
    // new HtmlWebpackExternalsPlugin({          
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'https://unpkg.com/react@17/umd/react.production.min.js',
    //       global: 'React',
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
    //       global: 'ReactDOM',
    //     },
    //   ]
    // })
  ],
  devtool: false
}