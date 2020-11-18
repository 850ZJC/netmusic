module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'pages': '@/pages',
        'base':'@/base',
        'getInfo':'@/getInfo'
      }
    }
  },
//   devServer: {
//     proxy: {
//         '/api': {
//             target: 'http://api.javaswing.cn', //对应自己的接口
//             changeOrigin: true,
//             ws: true,
//             secure: false,
//             pathRewrite: {
//                 '^/api': ''
//             }
//         }
//     }
// },
}

