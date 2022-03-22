const { prompt } = require('enquirer')

module.exports = {
  name: 'banquet/spa',
  version: '1',
  order: 1,
  hint: 'Generate a new spa',
  async extends() {
    const selectedBlueprint = await prompt({
      type: 'select',
      name: 'name',
      message: 'What type of Banquet SPA are you creating?',
      initial: 'banquet/child-spa',
      choices: [
        {
          name: 'banquet/child-spa',
          hint: 'SPA designed to load into Layout SPA'
        },
        {
          name: 'banquet/layout-spa',
          hint:
            'Layout SPAs contain multiple child SPAs and register in a route config'
        },
        {
          name: 'banquet/widget-spa',
          hint: 'Register in a route config - appear across multiple routes'
        }
      ]
    })
    return selectedBlueprint.name
  }
}
