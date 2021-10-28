import * as React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app/App'
import { banquetSingleSpaReact } from 'banquet-runtime-modules'
import './index.css'

const mountPoint = 'single-spa-application:root'
const reactLifecycles = banquetSingleSpaReact({
  React,
  ReactDOM,
  cssScope: '{{cssScope}}',
  rootComponent: App,
  sentry: {
    publicKey: '{{sentryPublicKey}}',
    projectId: '{{sentryProjectId}}'
  },
  domElementGetter: () => {
    const el = document.getElementById(mountPoint)
    if (!el) {
      throw new Error(
        `${mountPoint} does not exist, it is required for layout spas`
      )
    }
    return el
  }
})

export const bootstrap = reactLifecycles.bootstrap
export const mount = reactLifecycles.mount
export const unmount = reactLifecycles.unmount
