import React from 'react'
import { ErrorBoundary } from '@toasttab/error-boundary'
import { ArchiveIcon } from '@toasttab/buffet-pui-icons'

export default function App(props) {
  return (
    <ErrorBoundary>
      <div data-bt>
        <div className='container mx-40'>
          hello world
          <ArchiveIcon />
        </div>
      </div>
    </ErrorBoundary>
  )
}
