// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // 将入口文件指定为main.js
  entry: {
    main: path.resolve(__dirname, 'src', 'main.js'),
    index: {
      // dependOn: 'main',
      import: path.resolve(__dirname, 'src', 'index.js'),
      filename: 'index-file.js'
      // dependOn和runtime不应在同一个入口上同时使用,
      // TODO: 因为依赖另一个入口是要保持相同的chunk吗
      // runtime: 'chunk-index',
      // publicPath: './'
    }
  },
  // 将输出文件目录改为build/
  output: {
    path: path.resolve(__dirname, 'build')
  },
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
    })
  ]
}
