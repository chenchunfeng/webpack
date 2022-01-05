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

**entry**

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

**output**
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


**module.rules**  用于对模块的源代码进行转换, 原本只支持js/json


|名称 | 描述|
|:----:|:----:|
|babel-loader | 转换es6 es7等js新特性语法|
|style-loader | 把 CSS 插入到 DOM 中 |
|css-loader | 支持.css文件加载解析 |
|less-loader | 支持.less文件转换成css |
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