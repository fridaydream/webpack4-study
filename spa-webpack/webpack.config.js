const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;

const PurifyCSSPlugin = require('purifycss-webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const argv = require('yargs-parser')(process.argv.slice(2))
const merge = require('webpack-merge')
const _mode = argv.mode || 'development'
const _modeflag = _mode === 'production'
const _mergeConig = require(`./config/webpack.${_mode}.js`)
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const {
  join
} = require('path')

const glob = require('glob')
const path = require('path')
const setIterm2Badge = require('set-iterm2-badge')
setIterm2Badge('开发环境')
const config = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader'
        }]
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          name: 'common',
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [
    // new WebpackDeepScopeAnalysisPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: _modeflag ? "styles/[name].[hash:5].css" : "styles/[name].css",
      chunkFilename: _modeflag ? "styles/[id].[hash:5].css" : "styles/[id].css"
    }),
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, './src/*.html'))
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
  ]
}

module.exports = merge( _mergeConig,config)