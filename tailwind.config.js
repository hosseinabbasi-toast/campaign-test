// We put this in a tailwind.config.js so that the Tailwind CSS IntelliSense find it.
const baseConfig = require('@toasttab/buffet-pui-styles')

baseConfig.theme.colors.brand[40] = '#FCD7CE'

module.exports = {
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    extend: {
      transitionDelay: {
        '0': '0ms'
      },
      borderRadius: {
        xl: '25px'
      },
      inset: {
        12: '3rem'
      }
    }
  },
  variants: {
    ...baseConfig.variants,
    opacity: ['responsive', 'hover', 'focus', 'group-hover'],
    visibility: ['responsive', 'group-hover'],
    transitionDelay: ['responsive', 'group-hover'],
    transitionProperty: ['responsive', 'group-hover'],
    transitionTimingFunction: ['responsive', 'group-hover'],
    borderWidth: ['responsive', 'last'],
    transitionDuration: ['responsive', 'group-hover']
  },
  // If using css classes in files not covered by these globs you should extend this
  purge: {
    enabled: process.env.NODE_ENV === 'production' ? true : false,
    content: [
      './src/**/*.@(js|jsx|ts|tsx|css)',
      './packages/**/*.@(js|jsx|ts|tsx|css)',
      './node_modules/@toasttab/buffet-pui-*/dist/esm/index.js'
    ]
  },

  important: '[data-bt]',
  // extend plugins, this plugin provides css variables for the tailwind classes
  plugins: [...baseConfig.plugins]
}
