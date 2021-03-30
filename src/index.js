import { banquetSingleSpaReact } from '@toasttab/banquet-single-spa-react'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import './index.css'

const reactLifecycles = banquetSingleSpaReact({
  React,
  ReactDOM,
  domElementGetter: () => {
    const element = document.createElement('div')
    element.setAttribute('id', 'single-spa-application:banquet-template')
    element.setAttribute('data-bt', true)
    const el = document.body.appendChild(element)
    return el
  },
  rootComponent: App
})

export const bootstrap = reactLifecycles.bootstrap
export const mount = reactLifecycles.mount
export const unmount = reactLifecycles.unmount
