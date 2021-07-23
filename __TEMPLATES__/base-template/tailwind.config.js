const baseConfig = require('@toasttab/buffet-pui-styles')
module.exports = {
  ...baseConfig,
  // If using css classes in files not covered by these globs you should extend this
  purge: {
    enabled: process.env.NODE_ENV === 'production' ? true : false,
    content: [
      './src/**/*.@(js|jsx|ts|tsx|css)',
      './packages/**/*.@(js|jsx|ts|tsx|css)',
      './node_modules/@toasttab/buffet-pui-*/dist/esm/index.js'
    ]
  },
  important: '[{{cssScope}}]'
}
