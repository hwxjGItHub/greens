'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const superangent = require('superagent')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    before(app) {
      let key = '28c32285d4a51';
      app.get('/api/MenuTypeTbl', (req, res) => {
        // http://apicloud.mob.com/v1/cook/category/query?key=28c32285d4a51
        superangent
          .get('http://apicloud.mob.com/v1/cook/category/query')
          .query({ key })
          .end((err, result) => {
            res.json(result);
          });
      });
      app.get('/api/cookbookList', (req, res) => {
        // http://apicloud.mob.com/v1/cook/menu/search?key=28c32285d4a51&cid=0010001007&page=1&size=10
        // 例/api/cookbookList?cid=0010001007&page=1&size=10
        // 菜谱分类id cid  根据cid拿到对应分类的菜谱列表
        let cid = req.query.cid;
        let page = req.query.page;
        let size = req.query.size;
        superangent
          .get('http://apicloud.mob.com/v1/cook/menu/search')
          .query({ key, cid, page, size })
          .end((err, result) => {
            res.json(result);
          });
      });
      app.get('/api/cookedFood', (req, res) => {
        // http://apicloud.mob.com/v1/cook/menu/query?key=28c32285d4a51&id=00100010070000017756
        // 根据id拿到对应菜肴的详情
        // 例 /api/cookedFood?id=00100010070000017756
        let id = req.query.id;
        superangent
          .get('http://apicloud.mob.com/v1/cook/menu/query')
          .query({ key, id })
          .end((err, result) => {
            res.json(result);
          });
      })
    },
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
