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
|mini-css-extra-plugin | css文件单独抽离，便于缓存。跟style-loader功能互斥 |
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

## **热更新**
- webpack-dev-server wds 不需要刷新浏览器 不输出文件，放在内存中 
  - 添加 webpack-dev-serve --open
  - mode: 'development' 
  - config 里面添加 devServer: {contentBase: './dist', hot: true}   webpack-dev-server v4 hot默认为true contentBase 改为static
  - 添加webpackHotReplacementPlugin 
- webpack-dev-middleware WDM 将 webpack 输出的⽂文件传输给服务器


## **文件指纹**

Hash 整个项目相关，有一个文件修改，hash值都会变化
ChunkHash 跟webpack打包chunk有关，一般对应output   HMR跟影响chunkHash生成
ContentHash 跟文件内容相关，一般用于mini-css-extract-plugin


<!-- webpack 打包过程 -->
1. 源代码 很多module
2. webpack 通过entry 进来，文件之间的引用关系，代码成不同的chunk
3. webpack 给浏览器输入可阅读的bundle 文件
  
module -> chunk -> bundle

指定webpack 打包配置文件 --config xxx

> 需要注意file-loader里面的hash 是指文件内容的hash 跟webpack项目的hash不一样

## **代码压缩**

压缩的前提，生产环境才需要
1. js 代码压缩    v5 production 配置默认optimization.minimize = true
  - uglifyjs-webpack-plugin es6代码要配置ecma   
  - parallel-uglifyJs-webpack-plugin 非官方维护
  - terser-webpack-plugin  v5 内置
```javascript

  terserOptions: {
    compress: {
      drop_console: true, // 默认false. 传true的话会干掉console.*函数。如果你要干掉特定的函数比如console.info ，又想删掉后保留其参数中的副作用，那用pure_funcs来处理吧。
      drop_debugger: true, // 默认true.
      pure_funcs: ["console.log"],  // 假如返回值没被调用则可以安全移除的函数
    },
  }

```

2. css 压缩
  - optimize-css-assets-webpack-plugin 配合cssnano
  - css-minimizer-webpack-plugin 跟optimize-css-assets-webpack-plugin 一样，但在 source maps 和 assets 中使用查询字符串会更加准确，支持缓存和并发模式下运行。


3. html 压缩
  - html-webpack-plugin
  ```javascript
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html',
            chunks: ['index'],
            inject: true, // inject?: 'body' | 'head' | boolean | undefined; 资源注入
            minify: {
                html5: true,
                collapseWhitespace: true,  // 折叠空白
                preserveLineBreaks: false, // 如果为true 折叠空白保留一个
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),

```

## **功能增强**
### css 浏览器兼容

  使用postCss loader 加autoPrefixer 后置处理器，自动获取浏览器的流行度和能够支持的属性，并根据这些数据帮你自动为 CSS 规则添加前缀。根据 Can I Use 规则（ https://caniuse.com/ ）
```javascript
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
```

### 移动端兼容方案

 - px2rem-loader + lib-flexible

rem 单位， font-size of the root element

> html内联lib-flexible
> html-webpack-plugin 可以使用    <script><%= require('raw-loader!babel-loader!../node_modules/amfe-flexible') %></script>
> 但是raw-loader需要指定0.5.1版本输出字符串，高版本会出来module object

### 多⻚页⾯应用(MPA)  multiple page apply ?

通过设计特别的目录结构，封装函数处理，导出entry output
使用glob 遍历文件目录, 可以使用通配符*

优势
1. 页面之间解耦
2. seo

### source map

在devtool 里面设置 string | false

开发环境可以使用 eval-cheap-module-source-map    生产环境使用source-map   或者hidden-source-map

development模式下devtool默认应该是'eval'
production下默认是false

### 外部扩展(Externals)

生产环境配置  使用html-webpack-externals-plugin
```javascript
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
```

> cdn 最好还是自己搭，第三个的很容易搞
### 提取页面公共资源

内置splitChunkPlugin,简单的来说就是Webpack中一个提取或分离代码的插件，主要作用是提取公共代码，防止代码被重复打包，拆分过大的js文件，合并零散的js文件。

```javascript
module.exports = {
    //...
    optimization: {
      splitChunks: {
        // async：异步引入的库进行分离（默认）， initial： 同步引入的库进行分离， all：所有引入的库进行分离（推荐）
        chunks: 'async',
        minSize: 30000, // 抽离的公共包最小的大小，单位字节Byte
        maxSize: 0, // 最大的大小
        minChunks: 1, // 资源使用的次数(在多个页面使用到)， 大于1， 最小使用次数
        maxAsyncRequests: 5, // 并发请求的数量
        maxInitialRequests: 3, // 入口文件做代码分割最多能分成3个js文件
        automaticNameDelimiter: '~', // 文件生成时的连接符
        // automaticNameMaxLength: 30, // 自动自动命名最大长度
        // name: true, //让cacheGroups里设置的名字有效
        cacheGroups: { //当打包同步代码时,上面的参数生效
          vendors: {
            test: /[\\/]node_modules[\\/]/, //检测引入的库是否在node_modlues目录下的
            priority: -10, //值越大,优先级越高.模块先打包到优先级高的组里
            filename: 'vendors.js'//把所有的库都打包到一个叫vendors.js的文件里
          },
          default: {
            minChunks: 2, // 上面有
            priority: -20, // 上面有
            reuseExistingChunk: true //如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
          }
        }
      }
    }
  };

  ```
### tree shaking

概念： 一个module里面有多个函数，但只引入使用到一个函数，但webpack打包还是会整体module函数打包进bundle里。tree shaking则只打包使用到的函数，没有用到的方法函数会在uglify阶段被删除

- webpack 在production环境中，默认开启
- webpack 默认⽀支持，在 .babelrc ⾥里里设置 modules: false 即可
> 使用要求， 必须使用es6语法， common.js方式不支持

摇到什么代码？ DCE   dead code elimination
1. 不可到达的代码
2. 代码执行不会用的变量 只写不读
3. 代码执行结果不会被用到的

```javascript
if (false) {
  console.log('永远不可到达的代码')
}
```

ES6 模块的特点:
- 只会在模块顶部出现
- import的模块名只能是字符串常量
- import binding是immutable的

> 副作用这个概念来源于函数式编程(FP)，纯函数是没有副作用的，也不依赖外界环境或者改变外界环境。纯函数的概念是：接受相同的输入，任何情况下输出都是一样的。

非纯函数存在副作用，副作用就是：相同的输入，输出不一定相同。或者这个函数会影响到外部变量、外部环境。

函数如果调用了全局对象或者改变函数外部变量，则说明这个函数有副作用。

### scope hoisting


顾名思义，作用域提升,对于引入其它文件，webpack会打包生成两个函数，但如果使用了作用域提升，会打包成一个函数，减少内存消耗

> 原理：将所有模块的代码按照引⽤用顺序放在一个函数作⽤用域⾥，然后适当的重命名变量以防⽌止变量名冲突。
> 对比: 通过 scope hoisting 可以减少函数声明代码和内存开销。
```javascript
// a.js
export function a() {
  console.log('a file');
}

// b.js
import { a } from 'a';
console.log(a());


// 最后出来的bundle.js
[
  (function (module, __webpack_exports__, __webpack_require__) {
    var __WEBPACK_IMPORTED_MODULE_0__a_js__ = __webpack_require__(1);
    console.log(__WEBPACK_IMPORTED_MODULE_0__a_js__["a"]());
  }),
  (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_exports__["a"] = function(){console.log('a file');};
  })
]

// 开启scope hoisting 
// 生产环境默认开启optimization.concatenateModules: true
// webpack.config.dev.js
{
  mode: 'development'
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin();
  ]
}
// 最后的bundle.js 大概是这样
[
  (function (module, __webpack_exports__, __webpack_require__) {
    var a = function(){console.log('a file');};;
    console.log(a);
  })
]
```
<!-- module.exports = {
  resolve: {
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  plugins: [
    // 开启 Scope Hoisting 功能
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}; -->

### 代码懒加载 lazy loading

目前使用vue框架开发，在[vue-router文档](https://v3.router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97)中有说明

这里面有两个知识点,配置这两点轻松实现路由组件的懒加载。

- [异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6)
- Webpack 的代码分割功能

>  使用import() 如果您使用的是 Babel，你将需要添加 syntax-dynamic-import (opens new window)插件，才能使 Babel 可以正确地解析语法。
> vue-cli3生成的代码，包含dynamic-import 在@vue/cli-plugin-babel中。


早期webpack 版本，可以使用[require.ensure](https://webpack.docschina.org/api/module-methods#requireensure)实现，不用import()
```javascript
require.ensure(
  dependencies: String[],
  callback: function(require),
  errorCallback: function(error),
  chunkName: String
)
// 1. dependencies：字符串数组，声明 callback 回调函数中所需要的所有模块。
// 2. callback：当依赖项加载完成后，webpack 将会执行此函数，require 函数的实现，作为参数传入此函数中。当程序运行需要依赖时，可以使用 require() 来加载依赖。函数体可以使用此参数，来进一步执行 require() 模块。
// 3. errorCallback：当 webpack 加载依赖失败时会执行此函数。
// 4. chunkName：由 require.ensure 创建的 chunk 的名称。通过将相同 chunkName 传递给不同的 require.ensure 调用，我们可以将其代码合并到一个单独的 chunk 中，从而只产生一个浏览器必须加载的 bundle
```

> require.ensure() 是 webpack 特有的，已被 import() 取代。


早期浏览器使用dynamic import 在babel 里面需要扩展插件

```javascript
  "plugins": [
    "@babel/plugin-syntax-dynamic-import"
  ]
```
### eslint配置

使用alloyTeam eslint-config-alloy  配置


三个阶段校验

1. git precommit 里 通过安装 husky lint-staged 执行 eslint --fix
2. 在webpack 打包的时候，可以通过eslint-loader处理 js文件
3. 在ci阶段pipeline build指令前 校验


### library 打包

知识点，打包xxx.min.js版本 打包umd cjs esm amd

- cjs common js   const a = require('xxxx')
- amd  asynchronous module definition   require([module], callback);
- umd  兼容AMD和commonJS规范的同时，还兼容全局引用的方式  define
- esm  es6 module 

> 1、导入：import {模块名A，模块名B...} from '模块路径'
> 2、导出：export和export default
> 3、import('模块路径').then()方法


开发步骤： 

1. npm init
2. npm install webpack webpack-cli
3. touch webpack.dev.js
4. webpack配置,设置两个入口，为了打包出两个文件
```javascript
module.exports = {
  // 默认不压缩，production会压缩
  mode: 'none'，
  enter: {
    'large-number': path.resolve(__dirname, './src/index.js'),
    'large-number.min': path.resolve(__dirname,'./src/index.js')
  }
  output: {
    filename: '[name].js',
    library: 'largeNumber',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  optimization: {
    minimize: true,
    minimizer: {
       [
            new TerserPlugin({
                include: /\.min\.js$/,
            })
        ]
    }
  }
}
```

npm adduser

填Username  Password  Email

npm publish

如果出现 403 Forbidden - PUT https://registry.npmjs.org/large-number-plus - You do not have permission to publish "large-number-plus". Are you logged in as the correct user?

npm可能存在同名npm包