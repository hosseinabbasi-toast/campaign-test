import * as React from 'react'

export {
  useBanquetProps,
  SetSingleSpaContext
} from '@toasttab/banquet-single-spa-react'

export const BanquetLoader = (props) => {
  return (
    <div className='w-100 bg-gray-0 text-center py-16 my-4'>
      <p className='type-default uppercase'>{props.name}</p>
      <p className='type-subhead'>
        A banquet spa will be loaded here at runtime
      </p>
    </div>
  )
}
