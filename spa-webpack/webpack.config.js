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
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const smp = new SpeedMeasurePlugin();
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ManifestPlugin = require('webpack-manifest-plugin')
const setTitle = require('node-bash-title');
// setTitle('🍻  Server');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {
  join
} = require('path')

const glob = require('glob')
const path = require('path')
const setIterm2Badge = require('set-iterm2-badge')
// setIterm2Badge('开发环境')
const loading = {
  html: '加载中'
}
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
    },
    // minimizer: [new UglifyJsPlugin({
    //   // parallel: true
    //   parallel: true,
    // })]
  },
  plugins: [
    // new ProgressBarPlugin(),
    new ManifestPlugin(),
    // new DashboardPlugin(),
    // new WebpackDeepScopeAnalysisPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: _modeflag ? "styles/[name].[hash:5].css" : "styles/[name].css",
      chunkFilename: _modeflag ? "styles/[id].[hash:5].css" : "styles/[id].css"
    }),
    // new PurifyCSSPlugin({
    //   paths: glob.sync(path.join(__dirname, './src/*.html'))
    // }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      loading
    }),
    new WebpackBuildNotifierPlugin({
      title: "My Project Webpack Build",
      suppressSuccess: true
    }),
  ]
}

// module.exports = smp.wrap(merge( _mergeConig,config))
module.exports = merge(_mergeConig,config)