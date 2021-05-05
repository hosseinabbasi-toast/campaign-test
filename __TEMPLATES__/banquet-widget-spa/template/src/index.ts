import React from 'react'
import ReactDOM from 'react-dom'
import { App } from 'App'
import { banquetSingleSpaReact } from '@toasttab/banquet-single-spa-react'
import './index.css'

const reactLifecycles = banquetSingleSpaReact({
  React,
  ReactDOM,
  cssScope: '{{cssScope}}',
  rootComponent: App,
  domElementGetter: (customProps) =>
    document.getElementById('{{spaMountPointId}}')
})

export const bootstrap = reactLifecycles.bootstrap
export const mount = reactLifecycles.mount
export const unmount = reactLifecycles.unmount
