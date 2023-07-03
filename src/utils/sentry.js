import * as Sentry from '@sentry/react'
import envFromHostname from '@toasttab/env-from-hostname'

export const init = ({ publicKey, projectId }) => {
  if (!publicKey || !projectId) {
    throw new Error('Missing Sentry Configuration')
  }
  const dsn = `https://${publicKey}@sentry.io/${projectId}`
  const release = process.env.PKG_VERSION

  const environment = envFromHostname(window.location.hostname)
  if (environment !== 'dev') {
    const whitelistUrls = [/\.toast(tab|team)\.com\//]
    Sentry.init({ dsn, release, environment, whitelistUrls })
    Sentry.configureScope((scope) => {
      scope.setTag('package_name', process.env.PKG_NAME)
    })
  }
}
