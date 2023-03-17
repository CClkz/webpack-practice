// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ConsoleLogOnBuildWebpackPlugin = require('./plugins/ConsoleLogOnBuildWebpackPlugin')
module.exports = {
  // 将入口文件指定为main.js
  entry: {
    main: path.resolve(__dirname, 'src', 'main.js'),
    index: {
      // dependOn: 'main',
      import: path.resolve(__dirname, 'src', 'index.js'),
      filename: 'index.js'
      // dependOn和runtime不应在同一个入口上同时使用,
      // TODO: 因为依赖另一个入口是要保持相同的chunk吗
      // runtime: 'chunk-index',
      // publicPath: 'indexhello'
    }
  },
  // 向硬盘写入编译文件，多文件也只能有一个output配置
  // 将输出文件目录改为build/
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: ''
    // filename: '[name].out.js'
  },
  // CDN
  // output: {
  //   path: path.resolve(__dirname, 'home/proj/cdn/assets/[fullhash]'),
  //   publicPath: 'https://cdn.example.com/assets/[fullhash]/'
  // },
  // 找模块路径
  resolve: {},
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new CleanWebpackPlugin(),
    new ConsoleLogOnBuildWebpackPlugin()
  ],
  devServer: {
    hot: true,
    liveReload: true
  }
}
