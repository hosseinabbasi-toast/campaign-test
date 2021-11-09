import * as React from 'react'
import { App } from './App'
import { BanquetCustomProps } from '@toasttab/banquet-types'
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
    <SetSingleSpaContext
      value={{ auth: { userInfo: { firstName: 'Foo' } } } as BanquetCustomProps}
    >
      <App {...args} />
    </SetSingleSpaContext>
  )
}
