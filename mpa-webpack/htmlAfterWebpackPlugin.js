const pluginName = 'HtmlAfterWebpackPlugin';

class HtmlAfterWebpackPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, compilation => {
      console.log('The webpack build process is starting!!!');
      // html-webpack-plugin-before-html-processing
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(pluginName, htmlPluginData => {
        const result = htmlPluginData.assets.js
        let _html = htmlPluginData.html
        console.log('result', result)
        _html = _html.replace('<!--injectjs-->', `<script src="${result}"></script>`)
        htmlPluginData.html=_html
        

      })

    });
  }
}

module.exports = HtmlAfterWebpackPlugin