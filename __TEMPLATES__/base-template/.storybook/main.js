const path = require('path')
const { commonConfig } = require('@toasttab/banquet-webpack')
const customConfig = commonConfig({ mode: 'development' })

module.exports = {
  stories: [
    'src/**/*.story.@(js|jsx|ts|tsx|mdx)',
    'client/**/*.story.@(js|jsx|ts|tsx|mdx)',
    'packages/**/*.story.@(js|jsx|ts|tsx|mdx)',
    'local-packages/**/*.story.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],

  webpackFinal: async config => {
    const cssRule = customConfig.module.rules.find(rule => {
      return rule.test ? rule.test.toString() === '/\\.css$/' : false
    })
    const cssIndex = config.module.rules.findIndex(
      rule => rule.test.toString() === '/\\.css$/'
    )
    config.module.rules[cssIndex] = cssRule
    return config
  }
}
