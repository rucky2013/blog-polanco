const config = {
  use: [
    'postcss-import',
    'postcss-nested-props',
    'postcss-nested',
    'postcss-custom-properties',
    'autoprefixer'
  ],
  input: 'src/styles/main.sss',
  output: 'dist/css/styles.css',
  parser: 'sugarss',
  'postcss-import': {
    onImport(sources) {
      global.watchCSS(sources)
    }
  }
}

module.exports = config
