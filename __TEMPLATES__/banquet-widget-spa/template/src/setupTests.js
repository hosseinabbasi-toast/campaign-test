/* eslint-disable no-undef */
/* eslint-env browser */
import 'regenerator-runtime/runtime'
import { configure as RTLConfigure } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import fetchMock from 'jest-fetch-mock'

fetchMock.enableMocks()
RTLConfigure({ testIdAttribute: 'data-testid' })

const modalDiv = document.createElement('div')
modalDiv.setAttribute('id', 'modal-container')
document.querySelector('body').appendChild(modalDiv)

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  })
})

// This script is required to create full popper.js interactions
// on our components.
if (global.document && !document.createRange) {
  document.createRange = () => ({
    setStart: jest.fn(() => 0),
    setEnd: jest.fn(() => 10),
    getBoundingClientRect: () =>
      document.createElement('div').getBoundingClientRect(),
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document
    }
  })
}
