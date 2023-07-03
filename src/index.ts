import * as React from 'react'
import ReactDOM from 'react-dom'
import { banquetSingleSpaReact } from 'banquet-runtime-modules'
import { singleSpaCssLifecycles } from '@toasttab/banquet-single-spa-css'
import { App } from './app/App'
import './index.css'

const reactLifecycles = banquetSingleSpaReact({
  React,
  ReactDOM,
  singleSpaCssLifecycles,
  cssScope: 'data-pxcr-camp',
  rootComponent: App,
  portalContainers: ['banquetPortalsContainer'],
  // sentry: {
  //   publicKey: '',
  //   projectId: '',
  //   releaseVersion: process.env.PKG_VERSION
  // }
})

export const bootstrap = reactLifecycles.bootstrap
export const mount = reactLifecycles.mount
export const unmount = reactLifecycles.unmount
export const name = 'cr-admin-campaign'
