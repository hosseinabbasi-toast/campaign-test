import * as React from 'react'
import { App } from './App'
import { SetSingleSpaContext } from 'banquet-runtime-modules'

export default {
  title: 'src/App',
  component: App,
  parameters: {
    layout: 'fullscreen'
  }
}

export function AppUsage(args) {
  return (
    <SetSingleSpaContext value={{ auth: { userInfo: { firstName: 'Foo' } } }}>
      <App {...args} />
    </SetSingleSpaContext>
  )
}
