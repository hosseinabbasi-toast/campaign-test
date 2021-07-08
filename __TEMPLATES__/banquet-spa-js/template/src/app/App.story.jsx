import React from 'react'
import { App } from './App'

export default {
  title: 'src/App',
  component: App
}

export function AppUsage(args) {
  return <App {...args} />
}
