import React from 'react'
import { useBanquetProps } from 'banquet-runtime-modules'

const SnapshotHeader = () => {
  const props = useBanquetProps()
  return (
    <div className='mx-4 md:mx-0'>
      <h3
        className='type-headline-4 md:type-headline-3 mb-6'
        data-test-id='restaurant_name'
      >
        {props?.restaurantInfo?.restaurantName}
      </h3>
    </div>
  )
}

export default SnapshotHeader
