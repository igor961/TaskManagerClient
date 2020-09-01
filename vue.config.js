module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/task-manager-client/'
    : '/',
  /*chainWebpack: config => {
    config.plugins.delete('hmr')
  }*/
}
