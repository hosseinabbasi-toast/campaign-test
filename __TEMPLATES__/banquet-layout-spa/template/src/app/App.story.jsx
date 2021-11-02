import * as React from 'react'
import { App } from './App'

export default {
  title: 'src/App',
  component: App,
  parameters: {
    layout: 'fullscreen'
  }
}

export function AppUsage(args) {
  return <App {...args} />
}
