const path = require('path');

module.exports = {
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '^/socket.io': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      }
    }
  }
};

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/main.styl'),
      ],
    });
}
