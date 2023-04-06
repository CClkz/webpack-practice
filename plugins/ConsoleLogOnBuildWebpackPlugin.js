const pluginName = 'ConsoleLogOnBuildWebpackPlugin'

class ConsoleLogOnBuildWebpackPlugin {
  constructor() {
    console.log('插件 constructor')
  }
  apply(compiler) {
    console.log('插件 apply')
    // console.log('compiler.hooks', Object.keys(compiler.hooks))
    // compiler.hooks [
    //   'initialize',          'shouldEmit',
    //   'done',                'afterDone',
    //   'additionalPass',      'beforeRun',
    //   'run',                 'emit',
    //   'assetEmitted',        'afterEmit',
    //   'thisCompilation',     'compilation',
    //   'normalModuleFactory', 'contextModuleFactory',
    //   'beforeCompile',       'compile',
    //   'make',                'finishMake',
    //   'afterCompile',        'readRecords',
    //   'emitRecords',         'watchRun',
    //   'failed',              'invalid',
    //   'watchClose',          'shutdown',
    //   'infrastructureLog',   'environment',
    //   'afterEnvironment',    'afterPlugins',
    //   'afterResolvers',      'entryOption'
    // ]

    compiler.hooks.run.tap(pluginName, compilation => {
      console.log('webpack 构建正在启动！')
    })
  }
}

// 为什么不直接输出对象 {apply(compiler){}}，因为插件可以传输参数，所以要new
module.exports = ConsoleLogOnBuildWebpackPlugin
