module.exports = {
  template: '{{templateName}}',
  version: '{{templateVersion}}',
  cssScope: '{{cssScope}}',
  storybook: {
    stories: [
      'src/**/*.story.@(js|jsx|ts|tsx|mdx)',
      'packages/**/*.story.@(js|jsx|ts|tsx|mdx)'
    ]
  }
}
