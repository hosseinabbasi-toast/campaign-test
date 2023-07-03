import * as sentry from './sentry'
import * as Sentry from '@sentry/react'

jest.mock('@sentry/react')

describe('Sentry initialization', () => {
  const { location } = window
  afterEach(() => {
    jest.resetModules()
    window.location = location
  })

  const setHostname = (hostname) => {
    delete window.location
    window.location = { ...location, hostname }
  }

  test('works with proper config', () => {
    let scope = { setTag: jest.fn() }
    setHostname('ws-preprod.eng.toasttab.com')
    Sentry.init.mockImplementationOnce(jest.fn)
    Sentry.configureScope.mockImplementationOnce((cb) => cb(scope))
    sentry.init({ publicKey: 'PUBLIC_KEY', projectId: 'PROJECT_ID' })

    expect(Sentry.init).toBeCalledTimes(1)
    expect(Sentry.init.mock.calls[0][0]).toHaveProperty(
      'dsn',
      'https://PUBLIC_KEY@sentry.io/PROJECT_ID'
    )
    expect(scope.setTag).toBeCalledTimes(1)
  })

  test('throws when missing public key', () => {
    expect(() => {
      sentry.init({ publicKey: '', projectId: 'PROJECT_ID' })
    }).toThrow()
  })

  test('throws when missing project Id', () => {
    expect(() => {
      sentry.init({ publicKey: 'PUBLIC_KEY', projectId: '' })
    }).toThrow()
  })
})
