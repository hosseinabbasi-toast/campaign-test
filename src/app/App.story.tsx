import * as React from 'react'
import { Story } from '@storybook/react'
import { SetSingleSpaContext, BanquetProps } from 'banquet-runtime-modules'
import { App } from './App'

export default {
  title: 'src/App',
  component: App,
  parameters: {
    layout: 'fullscreen'
  }
}

export const Usage: Story<BanquetProps> = (args) => {
  return (
    <SetSingleSpaContext value={args}>
      <App {...args} />
    </SetSingleSpaContext>
  )
}
Usage.args = {
  auth: {
    // @ts-ignore
    userInfo: { firstName: 'Foo', lastName: 'McToasty' }
  }
}
