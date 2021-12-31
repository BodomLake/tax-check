module.exports = {
  configureWebpack: {
    resolve: {
      alias: {}
    }
  },
  devServer: {
    proxy: 'http://localhost:4000',
    port: 3000,
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true
      },
    },
  }
}
