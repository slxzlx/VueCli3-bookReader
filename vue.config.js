const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  //配置别名
  devServer:{
    port:9999
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('cps',resolve('src/components'))
      .set('styles',resolve('src/styles'))
      .set('utils',resolve('src/utils'))
  }, 
}
