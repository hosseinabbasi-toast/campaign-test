import React from 'react'
import './index.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
}

export const decorators = [
  (Story) => (
    <div data-{{cssScope}}>
      <Story />
    </div>
  ),
];
