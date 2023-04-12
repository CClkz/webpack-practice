// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const ConsoleLogOnBuildWebpackPlugin = require('./plugins/ConsoleLogOnBuildWebpackPlugin')
module.exports = env => {
  console.log('环境变量', env)
  // process,node环境变量
  console.log('process.env.NODE_ENV', process.env.NODE_ENV)
  return {
    mode: 'development',
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
      },
      dynamic: './src/dynamic.js'
      // pageOne: './src/pageOne/index.js',
      // pageTwo: './src/pageTwo/index.js',
      // pageThree: './src/pageThree/index.js'
      // pageTwo: { import: './src/pageTwo/index.js', dependOn: 'pageOne' },
      // pageThree: { import: './src/pageThree/index.js', dependOn: 'pageOne' }
    },
    // 向硬盘写入编译文件，多文件也只能有一个output配置
    // 将输出文件目录改为build/
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].bundle.[contenthash].js',
      publicPath: '',
      clean: true
      // filename: '[name].out.js'
    },
    // CDN
    // output: {
    //   path: path.resolve(__dirname, 'home/proj/cdn/assets/[fullhash]'),
    //   publicPath: 'https://cdn.example.com/assets/[fullhash]/'
    // },
    // 找模块路径
    resolve: {},
    devtool: 'inline-source-map',
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
        title: 'Development',
        template: path.resolve(__dirname, 'public', 'index.html')
      }),
      new WebpackManifestPlugin(),
      new ConsoleLogOnBuildWebpackPlugin()
    ],
    optimization: {
      // 模块id,默认下按着文件解析顺序来增量,加此配置,就不会因为文件的增减来修改模块id
      // 推测,contenthash受[module.id,'文件内容']影响
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    devServer: {
      hot: true,
      liveReload: true,
      static: './build'
    }
  }
}
