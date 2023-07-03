module.exports = {
  template: 'cr-admin-campaign',
  version: '1',
  cssScope: 'data-pxcr-camp',
  storybook: {
    stories: [
      'src/**/*.story.@(js|jsx|ts|tsx|mdx)',
      'packages/**/*.story.@(js|jsx|ts|tsx|mdx)'
    ],
    mocks: {
      location: './src/__mocks__',
      packages: ['banquet-runtime-modules']
    }
  }
}
