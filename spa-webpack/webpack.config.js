const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;

const PurifyCSSPlugin = require('purifycss-webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require('glob')
const path = require('path')
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
  plugins: [
    new WebpackDeepScopeAnalysisPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, './dist/*.html'))
    })
  ]
}

module.exports = config