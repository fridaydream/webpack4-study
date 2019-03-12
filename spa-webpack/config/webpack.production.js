
const os = require('os')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = {
  output: {
    filename: 'scripts/[name].[hash:5].bundles.js',
    publicPath: '/'
  },
  plugins: [
    new ParallelUglifyPlugin({
      exclude:/\.min\.js/, // Optional regex, or array of regex to exclude from minification. Matching files are not minified.
      workerCount:os.cpus().length, // Optional int. Number of workers to run uglify. Defaults to num of cpus - 1 or asset count (whichever is smaller)
      // uglifyJS: {
   
      // },
      uglifyES: {
        output: {
          beautify: false,
          comments: false
        },
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true
        }
      }
    }),
  ]
}