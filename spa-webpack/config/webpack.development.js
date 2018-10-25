module.exports = {
  output: {
    filename: 'scripts/[name].bundles.js'
  },
  devServer: {
    port: 3000,
    // hot: true,
    before:(app)=> {
      app.get('/api/test', (req, res) => {
        res.json({
          code: 200,
          message: 'hello world'
        })
      })
    }
  },
 
}