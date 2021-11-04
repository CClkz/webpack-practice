// 2021/11/3 杭州-滨江 cclkz
/**
 * 这里是为我所统帅的战场
 */
//webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name]-[chunkhash].js",
    },
    mode: "production",
    // 设置模块如何被解析
    resolve: {
        // 路径设置别名，让引入变得更简单
        alias: {
            "@": path.resolve(__dirname, "src")
        },
        // 引入哪些类型的文件时可以省略后缀名 
        // 默认值为 [".js", ".json"]
        extensions: [".js", ".json", ".vue"],
        // 解析模块时应该搜索的目录
        // 默认值：["node_modules"]，表示从当前目录的 node_modules 中查找，不存在时则去上级目录的 node_modules 中查找，一直到根目录为止。
        // 若设置为绝对路径，则只在指定的目录中查找
        modules: [path.resolve(__dirname, "src"), "node_modules"]

    },
    // 设置某些库不被打包，而是运行时去外部获取
    externals: {
        // index.js import jquery,会打包进main.js,导致项目体积过大,
        // 使用 externals 排除 jquery 打包，并通过 cdn 引入（index.js 中的引入要保留，不能删除）
        jquery: "jQuery" // key 为引入的包名，value 为全局变量名
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/, // 不处理 node_modules 中的文件
                use: [{
                        loader: "thread-loader", // 耗时比较长的 loader 才需要多进程，否则只会更慢
                        options: {
                            workers: 2 // 进程数 2
                        }
                    },
                    {
                        loader: "babel-loader",
                        // 也可以在项目根目录新建 .babelrc 文件，将配置写入文件中
                        options: {
                            presets: [
                                ["@babel/preset-env", {
                                    modules: false, // 对ES6的模块文件不做转化，以便使用 tree shaking
                                    useBuiltIns: "usage", // 取值可以是 false，"entry"，"usage"
                                    corejs: 3, // corejs 版本号
                                    targets: {} // 需要兼容的浏览器，若未配置，取 browserslist 中的值
                                }]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: "../"
                    }
                }, "css-loader"],
                // use: ["style-loader", "css-loader"] // 从后往前，先执行css-loader，后执行style-loader
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name]-[contenthash].[ext]", // ext表示文件的后缀名
                        outputPath: "images"
                    }
                },
            },
            // {
            //     test: /\.(jpe?g|png|gif|svg)$/,
            //     use: [{
            //         loader: "url-loader",
            //         options: {
            //             name: "[name]-[contenthash:10].[ext]",
            //             outputPath: "images",
            //             limit: 10 * 1024, // 表示 小于10k 的图片会被 base64 编码
            //             fallback: "file-loader", // 大于 10k 的图片由 file-loader 处理，默认值，可不设置
            //             esModule: false
            //         }
            //     }, {
            //         loader: "image-webpack-loader",
            //         options: {
            //             disabled: true // 在开发或使用webpack-dev-server时，使用它可以加快初始编译速度，并在较小程度上加快后续编译速度（来自官方文档）
            //         }
            //     }]
            // }
            // {
            //     test: /\.html$/,
            //     use: "html-loader"
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            title: "Webpack"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "style/[name].css"
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    devServer: {
        open: true, // 自动打开浏览器，下面三项不是必须的
        host: "localhost", // 如果希望被局域网访问，设为 0.0.0.0，默认 localhost
        port: "8888", // 端口，默认 8080
        hot: true, // webpack 会自动引入 HotModuleReplacementPlugin 插件
        // useLocalIp: true // 使用本地ip，如果 host 设置 0.0.0.0，请将此参数设为 true，否则结果就会像下面这样

        // 其他常用配置
        // contentBase: path.resolve(__dirname, "public"), // 告诉服务器从哪里提供内容，默认为当前工作目录
        // wacthContentBase: true, // 监视 contentBase 里面的内容，一旦变化就 reload，
        // watchOptions: {
        //   ignore: "", // 忽略哪些文件的变化
        // },
        // historyApiFallback: true, // 请求的资源不存在时返回 index.html，比如 vue-router 的 history 模式
        // clientLogLevel: "none", // 不要显示启动日志信息
        // overlay: false, // 如果出错了，不要全屏提示 
        // progress: true, // 控制台输出运行进度
        // compress: true, // 启用 gzip 压缩
        // proxy: { // 设置代理
        //   "/api": { // 当 url 中含有 /api 时就会使用这里设置的代理
        //     target: "http://xxxx.com", // 目标服务器地址
        //     changeOrigin: true, // 跨域
        //     ws: true, // 代理websocket
        //     pathRewrite: {
        //       "^/api": "" // url 重写，将 url 里面的 /api 去掉
        //     }
        //   }
        // }
    }
}