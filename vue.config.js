module.exports = {
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = 'Ecommerce Super Indo'
      return args
    })
  },
  publicPath: '/'
}
