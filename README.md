# webpack
good good study, day day up

1. initialize

安装：npm install webpack webpack-cli -D
版本查看： .\node_modules\.bin\webpack -v
webpack.config.js
可以通过webpack --config 指定配置文件

零配置的webpack配置
```javascript
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  },
  mode: 'production',
  module: {
  rules: [
    { test: /\.txt$/, use: 'raw-loader' }
  ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
}
```
基本配置
- entry
- output
- module.rules
- plugins
- mode

## **entry**

单入口、多入口

```javascript
//单入口
module.exports = {
  entry: './src/index.js'
}
//多入口
module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  }
}

```

## **output**
```javascript
//单入口
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'test.js'
  }
}
//多入口
module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  }
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  }
}
```
> <script defer="defer"></script>  如果您的脚本不会改变文档的内容，可将 defer 属性加入到script 标签中，以便加快处理文档的速度
> Path.resolve(__dirname, 'dist') 返回绝对路径  Path.join(__dirname, 'dist') 使用系统符合并路径
 
module.rules


## **module.rules**  用于对模块的源代码进行转换, 原本只支持js/json


| 名称 | 描述|
|:----|:----|
|  babel-loader | 转换es6 es7等js新特性语法|
| style-loader | 把 CSS 插入到 DOM 中 |
| css-loader | 支持.css文件加载解析 |
| less-loader | 支持.less文件转换成css |
|ts-loader | 支持.ts文件转换成js |
|url-loader | 将文件作为 data URI 内联到 bundle 中 limit: 单位Byte 常用8kb 8 * 1024 = 8192 减少http请求 超出的使用file-loader处理|
|file-loader | 进行图片 字体等打包 将文件发送到输出目录 woff otf 字体文件 |
|raw-loader | 将文件以字符串的形式导入|
|thread-loader | 多进程打包js css |

demo
```javascript
module.export = {
  entry: ''
}
```

注意webpack5已经弃用 raw-loader  url-loader file-loader   https://webpack.docschina.org/guides/asset-modules#root

如果要兼容

```javascript
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        // type: 'asset/resource', webpack 5
        use: [
        {
          loader: 'file-loader', 
          options: {
            name: 'fonts/[name]-[hash:8].[ext]',
            esModule: false     // 添加
          }
        }],
        type: 'javascript/auto' // 添加
      }
```



## **module.plugin**
插件⽤用于 bundle 文件的优化，资源管理和环境变量注入作⽤用于整个构建过程

|名称 | 描述|
|:----:|:----|
|HtmlWebpackPlugin | 创建html文件去显示输入的bundle文件 多入口的话，可以配置多个 默认为index.html|
|CleanWebpackPlugin | 清理构建（output）目录文件夹 注意 hash chunkhash的区别    webpack output 参数配置clean: true |
|CopyWebpackPlugin | 文件拷到构建目录 |
|UglifyjsWebpackPlugin | js 压缩 |


## **module.mode**

- development
- production
- none

|选项	|描述|
|:----|:----|
|development	|会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development. 为模块和 chunk 启用有效的名。|
|production	|会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。为模块和 chunk 启用确定性的混淆名称，FlagDependencyUsagePlugin，FlagIncludedChunksPlugin，ModuleConcatenationPlugin，NoEmitOnErrorsPlugin 和 TerserPlugin 。|
|none	|不使用任何默认优化选项|

如果没有设置，webpack 会给 mode 的默认值设置为 production。


## **module.watch** 监听文件变化

可以在配置文件里面添加watch true的参数 也可以在script 添加webpack --watch

原理:

轮询判断⽂文件的最后编辑时间是否变化
某个⽂文件发⽣生了了变化，并不不会⽴立刻告诉监听者，⽽而是先缓存起来，等 aggregateTimeout
```javascript
module.export = {
  //默认 false，也就是不不开启
  watch: true,
  //只有开启监听模式时，watchOptions才有意义
  watchOptions: {
  //默认为空，不监听的文件或者文件夹，支持正则匹配
  ignored: /node_modules/,
  //监听到变化发生后会等300ms再去执行，默认300ms
  aggregateTimeout: 300,
  //判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
  poll: 1000
}
```

> 这种方法的缺点就是要刷新浏览器才能显示新内容

**热更新**
- webpack-dev-server wds 不需要刷新浏览器 不输出文件，放在内存中 
  - 添加 webpack-dev-serve --open
  - mode: 'development' 
  - config 里面添加 devServer: {contentBase: './dist', hot: true}   webpack-dev-server v4 hot默认为true contentBase 改为static
  - 添加webpackHotReplacementPlugin 
- webpack-dev-middleware WDM 将 webpack 输出的⽂文件传输给服务器