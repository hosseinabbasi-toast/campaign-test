import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app/App'
import { banquetSingleSpaReact } from '@toasttab/banquet-single-spa-react'
import './index.css'

const reactLifecycles = banquetSingleSpaReact({
  React,
  ReactDOM,
  // Layout SPAs should have a domElementGetter function to add themselves to a DOM element - the default is single-spa-application:root
  domElementGetter: () => {
    return document.getElementById('single-spa-application:root')
  },
  rootComponent: App
})

export const bootstrap = reactLifecycles.bootstrap
export const mount = reactLifecycles.mount
export const unmount = reactLifecycles.unmount
