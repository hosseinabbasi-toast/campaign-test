import { CardContainer } from '@toasttab/buffet-pui-card'
import React, { ReactElement } from 'react'

interface ErrorStateProps {
  header: JSX.Element | string
  subheader: JSX.Element | string
  icon: ReactElement
}
const ErrorState = ({ header, subheader, icon }: ErrorStateProps) => {
  return (
    <CardContainer className='flex items-center justify-center'>
      <div className='text-center w-64 my-8'>
        {icon}
        <div className='mt-4 mb-2'>{header}</div>
        <div className='text-secondary type-caption'>{subheader}</div>
      </div>
    </CardContainer>
  )
}

export default ErrorState
