import * as React from 'react'
import { App } from './App'

export default {
  title: 'src/App',
  component: App
}

export function AppUsage(args: any) {
  return <App {...args} />
}
