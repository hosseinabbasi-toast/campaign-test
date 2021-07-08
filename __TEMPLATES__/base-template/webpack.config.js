/**
 * This is a TEMP requirement - it will output two bundles
 * - 'bundle.js'
 * - 'app.banquet.js'
 * If you need to edit this file - react out to the WEX team.
 */

module.exports = () => [
  {
    output: {
      filename: 'bundle.js'
    }
  },
  {
    output: {
      filename: 'app.banquet.js'
    }
  }
]
