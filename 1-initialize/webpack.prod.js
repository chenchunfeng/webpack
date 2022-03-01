const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');
const CssMinimizer = require('css-minimizer-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const path = require('path');
const glob = require('glob');
const setMPA = function() {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
  entryFiles.forEach(fileUrl => {
    // 匹配文件名做为entry入口
    const match = fileUrl.match(/src\/(.*)\/index\.js/);
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
    new HtmlWebpackExternalsPlugin({          
      externals: [
        {
          module: 'react',
          entry: 'https://unpkg.com/react@17/umd/react.production.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
          global: 'ReactDOM',
        },
      ]
    })
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
      new CssMinimizer()
    ],
    splitChunks: {
      // async：异步引入的库进行分离（默认）， initial： 同步引入的库进行分离， all：所有引入的库进行分离（推荐）
      chunks: 'all',
      minSize: 1024, // 抽离的公共包最小的大小，单位字节Byte
      maxSize: 0, // 最大的大小
      minChunks: 1, // 资源使用的次数(在多个页面使用到)， 大于1， 最小使用次数
      maxAsyncRequests: 5, // 并发请求的数量
      maxInitialRequests: 3, // 入口文件做代码分割最多能分成3个js文件
      automaticNameDelimiter: '~', // 文件生成时的连接符
      // automaticNameMaxLength: 30, // 自动自动命名最大长度
      // name: true, //让cacheGroups里设置的名字有效
      cacheGroups: { //当打包同步代码时,上面的参数生效
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 1
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/, //检测引入的库是否在node_modlues目录下的
          priority: -10, //值越大,优先级越高.模块先打包到优先级高的组里
          name: 'vendors'//把所有的库都打包到一个叫vendors.js的文件里
        },
        default: {
          minChunks: 2, // 上面有
          priority: -20, // 上面有
          reuseExistingChunk: true //如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
        }
      }
    }
  },
  devtool: false
}