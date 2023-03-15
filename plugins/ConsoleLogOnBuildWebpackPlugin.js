const pluginName = 'ConsoleLogOnBuildWebpackPlugin'

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    console.log('compiler.hooks', Object.keys(compiler.hooks))
    compiler.hooks.run.tap(pluginName, compilation => {
      console.log('webpack 构建正在启动！')
    })
  }
}

// 为什么不直接输出对象 {apply(compiler){}}，因为插件可以传输参数，所以要new
module.exports = ConsoleLogOnBuildWebpackPlugin
