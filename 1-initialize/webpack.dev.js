const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

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
    ...htmlWebpackPlugins,
    new CleanWebpackPlugin(),
    new HotModuleReplacementPlugin(),
    new HtmlWebpackExternalsPlugin({          
      externals: [
        {
          module: 'react',
          entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
          global: 'ReactDOM',
        },
      ]})

  ],
  devServer: {
    static: __dirname + '/dist',
    hot: true
  },
  // devtool: 'eval-cheap-module-source-map',

}