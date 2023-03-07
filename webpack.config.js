// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    // 将入口文件指定为main.js
    entry: {index: path.resolve(__dirname, "src", "main.js")},
    // 将输出文件目录改为build/
    output: {
        path: path.resolve(__dirname, "build")
    },
    module: {
      rules: [
          {
              test: /\.css$/,
              use: ["style-loader", "css-loader"]
          }
      ]
    },
    plugins:[
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html")
      })
    ]
};